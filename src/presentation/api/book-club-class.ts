import { STORAGE_DOWNLOAD_FOLDER } from '@src/config/server';
import { validationExample } from '@src/documentation/validation-example';
import AvailableClassRowEntity from '@src/domain/entities/book-club-class/available-class-row-entity';
import {
  AssociatedBCCEntity,
  BookClassAllInfo
} from '@src/domain/entities/book-club-class/book-club-class';
import { ReserveClassDataEntity } from '@src/domain/entities/book-club-class/reserve-class-data-entity';
import { UpdateBCClassEntity } from '@src/domain/entities/book-club-class/update-class-entity';
import { BookClubClassError } from '@src/domain/errors/book-club-class';
import { VolunteerError } from '@src/domain/errors/volunteer';
import { BookClubClassRepository } from '@src/domain/interfaces/repositories/book-club-class-repository';
import { VolunteerRepository } from '@src/domain/interfaces/repositories/volunteer-repository';
import { DriveFileHandler } from '@src/services/files/drive-file-handler';
import { FileHandler } from '@src/services/files/file-handler';
import { logger } from '@src/services/logger/logger';
import { PaginationResult } from '@src/services/repositories/helpers/wrapPagination';
import { SequelizeBCCRepository } from '@src/services/repositories/sequelize-bcc-repository';
import { SequelizeVolunteerRepository } from '@src/services/repositories/sequelize-volunteer-repository';
import express from 'express';
import { createReadStream, mkdirSync, readdirSync, rmSync, statSync } from 'fs';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import moment from 'moment';
import path from 'path';
import { Readable } from 'stream';
import {
  Body,
  Controller,
  FieldErrors,
  Get,
  Middlewares,
  Patch,
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

@Route('book-club-class')
@Tags('Book Club Class')
@Response<{ message: string; details: FieldErrors }>(
  422,
  'Validation Error',
  validationExample
)
@provide(BookClubClassAPI)
export class BookClubClassAPI extends Controller {
  private bccRepository: BookClubClassRepository;
  private volunteerRepository: VolunteerRepository;
  private fileHandler: FileHandler;

  constructor(
    @inject(SequelizeBCCRepository)
    bccRepository: BookClubClassRepository,
    @inject(SequelizeVolunteerRepository)
    volunteerRepository: VolunteerRepository,
    @inject(DriveFileHandler)
    fileHandler: FileHandler
  ) {
    super();
    this.bccRepository = bccRepository;
    this.volunteerRepository = volunteerRepository;
    this.fileHandler = fileHandler;
  }

  /**
   * Get all book-club-class.
   *
   * (The user must have bookPermissionn, which is checked using JWT)
   *  Pagination
   *  Page: ?page=number& (page number)
   *  Limit: ?limit=number& (data quantity - max=30)
   *
   * @example page "page=3"
   * @example limit "limit=20"
   */

  @Get('/')
  @Security('jwt')
  @Middlewares(paginationMiddleware)
  @SuccessResponse(200, 'Successfully generated the metrics')
  public async getVolunteersAttendanceMetrics(
    @Request() req: express.Request
  ): Promise<PaginationResult<BookClassAllInfo[]>> {
    const { pagination } = req;

    if (!pagination) throw Error();

    return this.bccRepository.getAllClasses(pagination);
  }

  /**
   * Download files of the book club class as a zip
   * The return of this route is a stream (content type: application/octet-stream)
   * and the response header include the file as an attachement
   *
   * (The volunteer must have bookPermission, which is checked using JWT)
   */
  @Get('download/{idclass}')
  @Security('jwt')
  @SuccessResponse(200, 'Successfully downloaded the files')
  @Response<BookClubClassError>(404, 'Essay not found', {
    name: 'ESSAY_NOT_FOUND',
    message: 'Essay with id {some class id} not found'
  })
  public async downloadClassReport(
    @Path() idclass: number,
    @Request() req: express.Request
  ): Promise<Readable> {
    const bcclass = await this.bccRepository.getBookClubClassById(idclass);
    if (!bcclass)
      throw new ApiError(
        404,
        new BookClubClassError({
          name: 'ESSAY_NOT_FOUND',
          message: `Essay with id ${idclass} not found`
        })
      );

    if (!bcclass.folderLink)
      throw new ApiError(
        404,
        new BookClubClassError({
          name: 'ESSAYS_DIRECTORY_NOT_FOUND_ERROR',
          message: 'Could not find essays directory'
        })
      );

    // get target from format https://drive.google.com/drive/folders/{target}?usp=sharing
    const folderId = bcclass.folderLink.split('/').slice(-1)[0].split('?')[0];

    const volunteerId = req.res?.locals.user.idvol;
    const downloadFolder = path.join(STORAGE_DOWNLOAD_FOLDER, `${volunteerId}`);
    mkdirSync(downloadFolder, { recursive: true });

    await this.fileHandler.downloadFilesFromSourceToFolder(
      folderId,
      downloadFolder
    );

    await this.fileHandler.zipFiles(downloadFolder, `${idclass}.zip`);

    const zipNameForClient = await this.fileHandler.getFolderName(folderId);

    const zipPath = path.join(downloadFolder, `${idclass}.zip`);

    req.res?.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `${zipNameForClient}.zip`
    );
    req.res?.setHeader('Content-Type', 'application/octet-stream');
    req.res?.setHeader('Content-Length', statSync(zipPath).size);

    logger.info(`Files on download folder: ${readdirSync(downloadFolder)}`);

    const stream = createReadStream(zipPath);

    stream.on('error', (error) => {
      logger.error(error);
    });

    stream.on('close', () => {
      logger.info('Closing stream');
      rmSync(downloadFolder, { recursive: true });
    });

    return stream;
  }

  /**
   * Get total count of book club classes by a volunteer.
   */
  @Get('count/{idvol}')
  @SuccessResponse(200, 'Ok')
  @Security('jwt')
  public async countEvaluatedBookClubClassByIdVol(
    @Path() idvol: number
  ): Promise<{ count: number }> {
    return this.bccRepository.countEvaluatedClassesByIdVol(idvol);
  }

  /**
   * Get available essays for evaluation for the volunteer,
   * those essays includes the ones which does not have a reservation date
   * or the reservations of the volunteer.
   *
   * (The volunteer must have bookPermission, which is checked using JWT)
   */
  @Get('available/{idvol}')
  @Security('jwt')
  @SuccessResponse(200, 'Successfully fetched the essays')
  async getAvailableClasses(
    @Path() idvol: number
  ): Promise<AvailableClassRowEntity[]> {
    const availableEssays = await this.bccRepository.getAvailableClasses();
    const hasDataInvioFunap = false;

    const reservedEssays = await this.bccRepository.getReservedClassesByIdVol(
      idvol,
      hasDataInvioFunap
    );

    const volunteerAccessableEssays = [...reservedEssays, ...availableEssays];

    return volunteerAccessableEssays;
  }

  /**
   * Reserve essay for the volunteer. If the essay is already reserved or evaluated
   * status 400 is returned.
   *
   * (The volunteer must have bookPermission, which is checked using JWT)
   */
  @Put('/reservation')
  @Security('jwt', ['bookPermission'])
  @SuccessResponse(200, 'Successfully reserved essay for volunteer')
  @Response<BookClubClassError>(404, 'Essay not found', {
    name: 'ESSAY_NOT_FOUND',
    message: 'Essay with id {some class id} not found'
  })
  @Response<VolunteerError>(412, 'Volunteer not found', {
    name: 'VOLUNTEER_NOT_FOUND',
    message: 'Volunteer with id {some volunteer id} not found'
  })
  @Response<BookClubClassError>(400, 'Essay already reserved or evaluated', {
    name: 'ESSAY_ALREADY_RESERVED_ERROR',
    message: 'Essay already reserved or already evaluated'
  })
  async reserveClassForVolunteer(@Body() reserveData: ReserveClassDataEntity) {
    const { idvol, idclass } = reserveData;

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

    const book = await this.bccRepository.getBookClubClassById(idclass);
    if (!book) {
      throw new ApiError(
        404,
        new BookClubClassError({
          name: 'ESSAY_NOT_FOUND',
          message: `Essay with id ${idclass} not found`
        })
      );
    }

    const reservedEssay = await this.bccRepository.reserveClassForVolunteer(
      idvol,
      idclass
    );

    if (!reservedEssay) {
      throw new ApiError(
        400,
        new BookClubClassError({
          name: 'ESSAY_ALREADY_RESERVED_ERROR',
          message: 'Essay already reserved or already evaluated'
        })
      );
    }

    return reservedEssay;
  }
  /**
   * Reserve essay for the volunteer.
   */
  @Put('/revert-reservation/{classId}')
  @Security('jwt', ['bookPermission'])
  @SuccessResponse(200, 'Successfully reserved essay for volunteer')
  @Response<BookClubClassError>(404, 'Essay not found', {
    name: 'ESSAY_NOT_FOUND',
    message: 'Essay with id {some class id} not found'
  })
  async revertReserveClassForVolunteer(@Path() classId: number) {
    const book = await this.bccRepository.getBookClubClassById(classId);
    if (!book) {
      throw new ApiError(
        404,
        new BookClubClassError({
          name: 'ESSAY_NOT_FOUND',
          message: `Essay with id ${classId} not found`
        })
      );
    }

    const revertReservedEssay =
      await this.bccRepository.revertReserveClassForVolunteer(classId);

    if (!revertReservedEssay) {
      throw new ApiError(
        400,
        new BookClubClassError({
          name: 'ESSAY_ALREADY_RESERVED_ERROR',
          message: 'Essay already revert reserved or already evaluated'
        })
      );
    }

    return revertReservedEssay;
  }

  /**
   * Get all the book club classes starting from the classId in the path
   *
   *
   * (The volunteer must have essayModulePermission, which is checked using JWT)
   */
  @Get('from-id/{classId}')
  @Security('jwt', ['essayModulePermission'])
  @SuccessResponse(200, 'Successfully fetched the classes')
  async getClassesFromId(
    @Path() classId: number
  ): Promise<AssociatedBCCEntity[]> {
    return await this.bccRepository.getClassesFromId(classId);
  }

  /**
   * Update class values available at UpdateBCClassEntity from class with classId
   *
   *
   * (The volunteer must have essayModulePermission, which is checked using JWT)
   */
  @Put('{classId}')
  @Security('jwt', ['essayModulePermission'])
  @SuccessResponse(200, 'Successfully updated the class')
  @Response<BookClubClassError>(404, 'Could not find class', {
    name: 'ESSAY_NOT_FOUND',
    message: `Essay with id {classId} not found`
  })
  @Response<BookClubClassError>(400, 'Could not update class', {
    name: 'ClASS_NOT_UPDATED_ERROR',
    message: `Class with ID {classId} not updated`
  })
  async updateClass(
    @Path() classId: number,
    @Body() bookClubClass: UpdateBCClassEntity
  ): Promise<AssociatedBCCEntity> {
    const book = await this.bccRepository.getBookClubClassById(classId);
    if (!book) {
      throw new ApiError(
        404,
        new BookClubClassError({
          name: 'ESSAY_NOT_FOUND',
          message: `Essay with id ${classId} not found`
        })
      );
    }

    const updatedBCC = await this.bccRepository.updatedClass(
      classId,
      bookClubClass
    );

    if (!updatedBCC) {
      throw new ApiError(
        400,
        new BookClubClassError({
          name: 'ClASS_NOT_UPDATED_ERROR',
          message: `Class with ID ${classId} not updated`
        })
      );
    }

    return updatedBCC;
  }

  @Patch('{classId}')
  @Security('jwt', ['bookPermission'])
  @SuccessResponse(200, 'Successfully updated the class')
  @Response<BookClubClassError>(404, 'Could not find class', {
    name: 'ESSAY_NOT_FOUND',
    message: `Essay with id {classId} not found`
  })
  @Response<BookClubClassError>(400, 'Could not update class', {
    name: 'ClASS_NOT_UPDATED_ERROR',
    message: `Class with ID {classId} not updated`
  })
  async updateConcluded(
    @Path() classId: number,
    @Body() evaluationDate: { endEvaluationDate: Date | null }
  ): Promise<AssociatedBCCEntity> {
    const book = await this.bccRepository.getBookClubClassById(classId);
    let evaluationDateFormatted = evaluationDate?.endEvaluationDate ?? null;
    if (evaluationDate?.endEvaluationDate) {
      evaluationDateFormatted = moment(
        evaluationDate.endEvaluationDate
      ).toDate();
      if (!book) {
        throw new ApiError(
          404,
          new BookClubClassError({
            name: 'ESSAY_NOT_FOUND',
            message: `Essay with id ${classId} not found`
          })
        );
      }
    }

    const updatedField = await this.bccRepository.updateConcluded(
      classId,
      evaluationDateFormatted
    );

    if (!updatedField) {
      throw new ApiError(
        400,
        new BookClubClassError({
          name: 'ClASS_NOT_UPDATED_ERROR',
          message: `Class with ID ${classId} not updated`
        })
      );
    }

    return updatedField;
  }
}
