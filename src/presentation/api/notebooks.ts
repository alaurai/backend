import { validationExample } from '@src/documentation/validation-example';
import { AvailableNotebookRowEntity } from '@src/domain/entities/notebook/available-notebook-row-entity';
import { EvaluateNotebookEntity } from '@src/domain/entities/notebook/evaluate-notebook-entity';
import {
  NotebookEntity,
  NotebookWithPlaceAndVolunteer
} from '@src/domain/entities/notebook/notebook-entity';
import { ReserveNotebookDataEntity } from '@src/domain/entities/notebook/reserve-notebook-data-entity';
import { UpdateNotebookEntity } from '@src/domain/entities/notebook/update-notebook-entity';
import { formatAvailableNotebookToTableRow } from '@src/domain/entity-formatters/format-available-notebook';
import { FetchFilesError } from '@src/domain/errors/fetch-files';
import { NotebookError } from '@src/domain/errors/notebook';
import { VolunteerError } from '@src/domain/errors/volunteer';
import { NotebookRepository } from '@src/domain/interfaces/repositories/notebook-repository';
import { VolunteerRepository } from '@src/domain/interfaces/repositories/volunteer-repository';
import { DriveFileHandler } from '@src/services/files/drive-file-handler';
import { FileHandler } from '@src/services/files/file-handler';
import { logger } from '@src/services/logger/logger';
import { PaginationResult } from '@src/services/repositories/helpers/wrapPagination';
import { SequelizeNotebookRepository } from '@src/services/repositories/sequelize-notebooks-repository';
import { SequelizeVolunteerRepository } from '@src/services/repositories/sequelize-volunteer-repository';
import express from 'express';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Readable } from 'stream';
import {
  Body,
  Controller,
  FieldErrors,
  Get,
  Middlewares,
  Path,
  Put,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags
} from 'tsoa';
import { paginationMiddleware } from '../middlewares/paginationMiddleware';
import { ApiError } from '../types/api-error';
import xlsx from 'xlsx';

@Route('notebooks')
@Response<{ message: string; details: FieldErrors }>(
  422,
  'Validation Error',
  validationExample
)
@Tags('Notebook')
@provide(NotebookAPI)
export class NotebookAPI extends Controller {
  private notebooksRepository: NotebookRepository;
  private volunteerRepository: VolunteerRepository;
  private fileHandler: FileHandler;

  constructor(
    @inject(SequelizeNotebookRepository)
    notebooksRepository: NotebookRepository,
    @inject(SequelizeVolunteerRepository)
    volunteerRepository: VolunteerRepository,
    @inject(DriveFileHandler)
    fileHandler: FileHandler
  ) {
    super();
    this.notebooksRepository = notebooksRepository;
    this.volunteerRepository = volunteerRepository;
    this.fileHandler = fileHandler;
  }

  /**
   * List all notebooks.
   *  Pagination
   *  Page: ?page=number& (page number)
   *  Limit: ?limit=number& (data quantity - max=30)
   *  Filter: ?classes=399,404,405& (filter by class ids - separator "," (comma))
   *
   * @example page "page=3"
   * @example limit "limit=20"
   * @example classes=399,404,405
   */

  @Get('/evaluation-list')
  @Security('jwt')
  @Middlewares(paginationMiddleware)
  @SuccessResponse(200, 'Successfully fetched the notebooks')
  async getNotebooksEvaluation(
    @Request() req: express.Request
  ): Promise<PaginationResult<NotebookWithPlaceAndVolunteer[]>> {
    const { pagination } = req;
    if (!pagination) throw Error();
    return await this.notebooksRepository.getAllNotebookEvaluation(pagination);
  }

  /**
   * Download  all notebooks.
   *  Filter: ?classes=399,404,405& (filter by class ids - separator "," (comma))
   *
   * @example classes=399,404,405
   */

  @Get('/evaluation-list/download')
  @Security('jwt')
  @Middlewares(paginationMiddleware)
  @SuccessResponse(200, 'Successfully fetched the notebooks')
  async getNotebooksEvaluationDownload(
    @Request() req: express.Request
  ): Promise<Readable> {
    const { pagination } = req;
    if (!pagination) throw Error();
    const notebooks =
      await this.notebooksRepository.getAllNotebookEvaluationDownload(
        pagination
      );

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(notebooks);
    xlsx.utils.book_append_sheet(wb, ws, `avaliação-do-caderno.xlsx`);
    const xlsxBuffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

    req.res?.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `avaliação-do-caderno.xlsx`
    );
    req.res?.setHeader('Content-Type', 'application/octet-stream');
    req.res?.setHeader('Content-Length', xlsxBuffer.byteLength);

    const stream = Readable.from(xlsxBuffer);

    stream.on('error', (error) => {
      logger.error(error);
    });

    stream.on('close', () => {
      logger.info('Closing stream');
    });

    return stream;
  }

  /**
   * Get total count of notebooks by a volunteer.
   */
  @Get('count/{idvol}')
  @SuccessResponse(200, 'Ok')
  @Security('jwt')
  public async countEvaluatedNotebooksByIdVol(
    @Path() idvol: number
  ): Promise<{ count: number }> {
    return this.notebooksRepository.countEvaluatedNotebooksByIdVol(idvol);
  }

  /**
   * Download the notebook with specified id as a pdf file
   * The return of this route is a stream (content type: application/octet-stream)
   * and the response header include the file as an attachement
   *
   * (The volunteer must have readPermission, which is checked using JWT)
   */
  @Get('download/{notebookId}')
  @Security('jwt', ['readPermission'])
  @SuccessResponse(200, 'Successfully downloaded the files')
  @Response<NotebookError>(404, 'Essay not found', {
    name: 'NOTEBOOK_NOT_FOUND_ERROR',
    message: 'Notebook with id {some Id} not found'
  })
  public async downloadNotebookFromId(
    @Path() notebookId: number,
    @Request() req: express.Request
  ): Promise<Readable> {
    const notebook = await this.notebooksRepository.getNotebookById(notebookId);
    if (!notebook)
      throw new ApiError(
        404,
        new NotebookError({
          name: 'NOTEBOOK_NOT_FOUND_ERROR',
          message: `Notebook with id ${notebookId} not found`
        })
      );

    if (!notebook.notebookDirectory)
      throw new ApiError(
        404,
        new NotebookError({
          name: 'NOTEBOOK_DIRECTORY_NOT_FOUND_ERROR',
          message: 'Could not found notebook directory'
        })
      );

    // get target from format https://drive.google.com/drive/folders/{target}?usp=sharing
    const folderId = notebook.notebookDirectory
      .split('/')
      .slice(-1)[0]
      .split('?')[0];

    let fileBuffer: Buffer;
    try {
      fileBuffer = await this.fileHandler.donwloadFileBufferFromName(
        folderId,
        notebook?.studentName ?? ''
      );
    } catch (error) {
      throw new ApiError(404, error as FetchFilesError);
    }

    req.res?.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `${notebook.studentName}.pdf`
    );
    req.res?.setHeader('Content-Type', 'application/octet-stream');
    req.res?.setHeader('Content-Length', fileBuffer.byteLength);

    const stream = Readable.from(fileBuffer);

    stream.on('error', (error) => {
      logger.error(error);
    });

    stream.on('close', () => {
      logger.info('Closing stream');
    });

    return stream;
  }

  /**
   * Get available notebooks for evaluation for the volunteer,
   * those notebooks includes the ones which does not have a reservation date
   * or the reservations of the volunteer.
   *
   * (The volunteer must have readPermission, which is checked using JWT)
   */
  @Get('available/{idvol}')
  @Security('jwt', ['readPermission'])
  @SuccessResponse(200, 'Successfully fetched the notebooks')
  async getAvailableNotebooksForEvalForIdVol(
    @Path() idvol: number
  ): Promise<AvailableNotebookRowEntity[]> {
    const availableNotebooks =
      await this.notebooksRepository.getAvailableNotebooks();

    const reservedNotebooks =
      await this.notebooksRepository.getReservedNotebooksByIdVol(idvol);

    const volunteerAccessableNotebooks = [
      ...reservedNotebooks,
      ...availableNotebooks
    ];
    return volunteerAccessableNotebooks.map((notebook) =>
      formatAvailableNotebookToTableRow(notebook)
    );
  }

  /**
   * Evaluate a notebook
   *
   * (The volunteer must have readPermission, which is checked using JWT)
   */
  @Put('/evaluation/{notebookId}')
  @Security('jwt', ['readPermission'])
  @SuccessResponse(200, 'Successfully Evaluated notebook')
  @Response<NotebookError>(404, 'Notebook not found', {
    name: 'NOTEBOOK_NOT_FOUND_ERROR',
    message: 'Notebook with id {some notebook id} not found'
  })
  @Response<NotebookError>(400, 'Notebook already evaluated', {
    name: 'NOTEBOOK_ALREADY_RESERVED_ERROR',
    message: 'Notebook with id {some notebook id} not found'
  })
  async saveNotebookEvaluation(
    @Path() notebookId: number,
    @Body() notebookData: EvaluateNotebookEntity
  ) {
    const notebook = await this.notebooksRepository.getNotebookById(notebookId);
    if (!notebook) {
      throw new ApiError(
        404,
        new NotebookError({
          name: 'NOTEBOOK_NOT_FOUND_ERROR',
          message: `Notebook with id ${notebookId} not found`
        })
      );
    }

    const evaluatedNotebook =
      await this.notebooksRepository.saveNotebookEvaluation(
        notebookId,
        notebookData
      );

    if (!evaluatedNotebook) {
      throw new ApiError(
        400,
        new NotebookError({
          name: 'NOTEBOOK_ALREADY_EVALUATED_ERROR',
          message: `Notebook with id ${notebookId} already evaulated`
        })
      );
    }

    return evaluatedNotebook;
  }

  /**
   * Reserve notebook for the volunteer. If the notebook is already reserve or evaluated
   * status 400 is returned.
   *
   * (The volunteer must have readPermission, which is checked using JWT)
   */
  @Put('/reservation')
  @Security('jwt', ['readPermission'])
  @SuccessResponse(200, 'Successfully reserved notebook for volunteer')
  @Response<NotebookError>(404, 'Notebook not found', {
    name: 'NOTEBOOK_NOT_FOUND_ERROR',
    message: 'Notebook with id {some notebook id} not found'
  })
  @Response<VolunteerError>(412, 'Volunteer not found', {
    name: 'VOLUNTEER_NOT_FOUND',
    message: 'Volunteer with id {some volunteer id} not found'
  })
  @Response<NotebookError>(400, 'Notebook already reserved or evaluated', {
    name: 'NOTEBOOK_ALREADY_RESERVED_ERROR',
    message: 'Notebook already reserved or already evaluated'
  })
  async reserveNotebookForVolunteer(
    @Body() reserveData: ReserveNotebookDataEntity
  ) {
    const { idvol, notebookId } = reserveData;

    const volunteer = await this.volunteerRepository.getVolunteerById(idvol);
    if (!volunteer) {
      throw new ApiError(
        412,
        new VolunteerError({
          name: 'VOLUNTEER_NOT_FOUND',
          message: `Volunteer with id ${idvol} not found`
        })
      );
    }

    const notebook = await this.notebooksRepository.getNotebookById(notebookId);
    if (!notebook) {
      throw new ApiError(
        404,
        new NotebookError({
          name: 'NOTEBOOK_NOT_FOUND_ERROR',
          message: `Notebook with id ${notebookId} not found`
        })
      );
    }

    const reservedNotebook =
      await this.notebooksRepository.reserveNotebookForVolunteer(
        idvol,
        notebookId
      );

    if (!reservedNotebook) {
      throw new ApiError(
        400,
        new NotebookError({
          name: 'NOTEBOOK_ALREADY_RESERVED_ERROR',
          message: 'Notebook already reserved or already evaluated'
        })
      );
    }

    return formatAvailableNotebookToTableRow(reservedNotebook);
  }

  /**
   * Revert reserve notebook for the volunteer.
   */
  @Put('/revert-reservation/{notebookId}')
  @Security('jwt', ['readPermission'])
  @SuccessResponse(200, 'Successfully revert reserved notebook for volunteer')
  @Response<NotebookError>(404, 'Notebook not found', {
    name: 'NOTEBOOK_NOT_FOUND_ERROR',
    message: 'Notebook with id {some notebook id} not found'
  })
  async revertReserveNotebookForVolunteer(@Path() notebookId: number) {
    const notebook = await this.notebooksRepository.getNotebookById(notebookId);
    if (!notebook) {
      throw new ApiError(
        404,
        new NotebookError({
          name: 'NOTEBOOK_NOT_FOUND_ERROR',
          message: `Notebook with id ${notebookId} not found`
        })
      );
    }

    const revertReservedNotebook =
      await this.notebooksRepository.revertReserveNotebookForVolunteer(
        notebookId
      );

    if (!revertReservedNotebook) {
      throw new ApiError(
        400,
        new NotebookError({
          name: 'NOTEBOOK_ALREADY_RESERVED_ERROR',
          message: 'Notebook already revert reserved or already evaluated'
        })
      );
    }

    return formatAvailableNotebookToTableRow(revertReservedNotebook);
  }

  /**
   * Update notebook values available at UpdateNotebookEntity from notebook with notebookId
   *
   *
   * (The volunteer must have notebookModulePermission, which is checked using JWT)
   */
  @Put('{notebookId}')
  @Security('jwt', ['readPermission'])
  @SuccessResponse(200, 'Successfully updated the class')
  @Response<NotebookError>(404, 'Could not find notebook', {
    name: 'NOTEBOOK_NOT_FOUND_ERROR',
    message: `Notebook with id {notebookId} not found`
  })
  @Response<NotebookError>(400, 'Could not update notebook', {
    name: 'NOTEBOOK_NOT_UPDATED_ERROR',
    message: `Notebook with ID {notebookId} not updated`
  })
  async updateNotebook(
    @Path() notebookId: number,
    @Body() notebook: UpdateNotebookEntity
  ): Promise<NotebookEntity> {
    const searchNotebook = await this.notebooksRepository.getNotebookById(
      notebookId
    );
    if (!searchNotebook) {
      throw new ApiError(
        404,
        new NotebookError({
          name: 'NOTEBOOK_NOT_FOUND_ERROR',
          message: `Notebook with id ${notebookId} not found`
        })
      );
    }

    const updatedNotebook = await this.notebooksRepository.updatedNotebook(
      notebookId,
      notebook
    );

    if (!updatedNotebook) {
      throw new ApiError(
        400,
        new NotebookError({
          name: 'NOTEBOOK_NOT_UPDATED_ERROR',
          message: `Notebook with ID ${notebookId} not updated`
        })
      );
    }

    return updatedNotebook;
  }

  /**
   * Get all the information from a notebook through the idcad
   *
   *
   * (The volunteer must have notebookModulePermission, which is checked using JWT)
   */
  @Get('{notebookId}')
  @Security('jwt', ['notebookModulePermission'])
  @SuccessResponse(200, 'Successfully fetched the notbooks')
  @Response<NotebookError>(404, 'Essay not found', {
    name: 'NOTEBOOK_NOT_FOUND_ERROR',
    message: 'Notebook with id {some Id} not found'
  })
  async getNotbookbyIdcad(@Path() notebookId: number) {
    const notebook = await this.notebooksRepository.getNotebookById(notebookId);
    if (!notebook) {
      throw new ApiError(
        404,
        new NotebookError({
          name: 'NOTEBOOK_NOT_FOUND_ERROR',
          message: `Notebook with id ${notebookId} not found`
        })
      );
    }
    return notebook;
  }

  /**
   * Endpoint to Get Relevant Reflections after a specific date
   *
   */
  @Get('reflections/{date}/download')
  @Security('jwt')
  @SuccessResponse(200, 'Successfully get relevant reflections')
  async getRelevantReflections(
    @Path() date: string,
    @Request() req: express.Request
  ): Promise<Readable> {
    const response = await this.notebooksRepository.getReflections(date);
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(response);
    xlsx.utils.book_append_sheet(wb, ws, `avaliação-do-livro.xlsx`);
    const xlsxBuffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

    req.res?.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `reflexões-de-cadernos-a-partir-de-${date}.xlsx`
    );
    req.res?.setHeader('Content-Type', 'application/octet-stream');
    req.res?.setHeader('Content-Length', xlsxBuffer.byteLength);

    const stream = Readable.from(xlsxBuffer);

    stream.on('error', (error) => {
      logger.error(error);
    });

    stream.on('close', () => {
      logger.info('Closing stream');
    });

    return stream;
  }
}
