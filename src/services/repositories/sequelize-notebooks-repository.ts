import {
  EvaluateNotebookEntity,
  EvaluateNotebookEntityDownload
} from '@src/domain/entities/notebook/evaluate-notebook-entity';
import {
  NotebookEntity,
  NotebookWithPlaceAndVolunteer
} from '@src/domain/entities/notebook/notebook-entity';
import { UpdateNotebookEntity } from '@src/domain/entities/notebook/update-notebook-entity';
import {
  NotebookRepository,
  RecletionsReturnType
} from '@src/domain/interfaces/repositories/notebook-repository';
import { provideSingleton } from '@src/helpers/provide-singleton';
import { PaginationParams } from '@src/presentation/types/paginationParams';
import moment from 'moment';
import { FindOptions, Op, QueryTypes } from 'sequelize';
import {
  evaluateNotebookEntityToEvaluateNotebookModel,
  evalutionListNotebookModelToEntity,
  evalutionListNotebookModelToEntityDownload,
  notebookModelToEntity,
  updateNotebookEntityToUpdateModel
} from '../database/mappers/notebooks';
import { Pep } from '../database/models/class';
import { Notebook } from '../database/models/notebook';
import { Place } from '../database/models/place';
import { Volunteer } from '../database/models/volunteer';
import { wrapPagination } from './helpers/wrapPagination';
import sequelize from '../database/sequelize';

@provideSingleton(SequelizeNotebookRepository)
export class SequelizeNotebookRepository implements NotebookRepository {
  async saveNotebookEvaluation(
    notebookId: number,
    notebookData: EvaluateNotebookEntity
  ): Promise<NotebookEntity | null> {
    await Notebook.update(
      evaluateNotebookEntityToEvaluateNotebookModel(notebookData),
      { where: { idcad: notebookId, 'Carimbo de data/hora': null } }
    );

    return this.getNotebookById(notebookId);
  }

  async getNotebookById(notebookId: number): Promise<NotebookEntity | null> {
    const notebook = await Notebook.findOne({
      include: [
        { model: Volunteer, as: 'volunteer' },
        { model: Pep, as: 'pep' }
      ],
      where: { idcad: notebookId }
    });
    return notebook ? notebookModelToEntity(notebook) : null;
  }

  async reserveNotebookForVolunteer(
    idvol: number,
    notebookId: number
  ): Promise<NotebookEntity | null> {
    await Notebook.update(
      { idvol, datareserva: moment().toDate() },
      {
        where: {
          idcad: notebookId,
          datareserva: null,
          'Carimbo de data/hora': null,
          aprovado: 'SIM'
        }
      }
    );

    return this.getNotebookById(notebookId);
  }
  async revertReserveNotebookForVolunteer(
    notebookId: number
  ): Promise<NotebookEntity | null> {
    await Notebook.update(
      { idvol: null, datareserva: null },
      {
        where: {
          idcad: notebookId,
          datareserva: { [Op.not]: null },
          idvol: { [Op.not]: null }
        }
      }
    );
    return await this.getNotebookById(notebookId);
  }
  async getReservedNotebooksByIdVol(idvol: number): Promise<NotebookEntity[]> {
    const notebooks = await Notebook.findAll({
      include: { association: Notebook.associations.pep },
      where: {
        idvol,
        'Carimbo de data/hora': null,
        aprovado: 'SIM',
        idpep: { [Op.ne]: null }
      }
    });
    return notebooks.map(notebookModelToEntity);
  }

  async getAvailableNotebooks(): Promise<NotebookEntity[]> {
    const notebooks = await Notebook.findAll({
      include: { association: Notebook.associations.pep },
      where: {
        datareserva: null,
        'Carimbo de data/hora': null,
        aprovado: 'SIM',
        idpep: { [Op.ne]: null }
      }
    });

    return notebooks.map(notebookModelToEntity);
  }

  async countEvaluatedNotebooksByIdVol(
    idvol: number
  ): Promise<{ count: number }> {
    const count = await Notebook.count({
      where: { idvol, 'Carimbo de data/hora': { [Op.ne]: null } }
    });
    return { count };
  }

  async updatedNotebook(
    notebookId: number,
    notebook: UpdateNotebookEntity
  ): Promise<NotebookEntity | null> {
    await Notebook.update(updateNotebookEntityToUpdateModel(notebook), {
      where: { idcad: notebookId }
    });
    return await this.getNotebookById(notebookId);
  }

  getAllNotebookEvaluation = wrapPagination(
    async (
      pagination: PaginationParams
    ): Promise<[NotebookWithPlaceAndVolunteer[], number]> => {
      const { offset, limit, filter } = pagination;
      const options: FindOptions = {
        include: [
          { model: Volunteer, as: 'volunteer', attributes: ['NOME'] },
          { model: Pep, as: 'pep', include: [{ model: Place, as: 'place' }] }
        ],
        order: [
          ['idcad', 'DESC'],
          ['Carimbo de data/hora', 'DESC']
        ],
        offset,
        limit,
        raw: true
      };

      if (filter && filter?.classes) {
        options.where = { IDPEP: { [Op.in]: filter.classes } };
      }

      const notebooks = await Notebook.findAll<
        Notebook & { 'pep.place.fullName'?: string; 'volunteer.NOME'?: string }
      >(options);

      const totalCount = await Notebook.count(options);

      return [notebooks.map(evalutionListNotebookModelToEntity), totalCount];
    }
  );

  async getAllNotebookEvaluationDownload(
    pagination: PaginationParams
  ): Promise<EvaluateNotebookEntityDownload[]> {
    const { filter } = pagination;
    const options: FindOptions = {
      include: [
        { model: Volunteer, as: 'volunteer', attributes: ['NOME'] },
        { model: Pep, as: 'pep', include: [{ model: Place, as: 'place' }] }
      ],
      order: [
        ['idcad', 'DESC'],
        ['Carimbo de data/hora', 'DESC']
      ],
      raw: true
    };

    if (filter && filter?.classes) {
      options.where = { IDPEP: { [Op.in]: filter.classes } };
    }

    const notebooks = await Notebook.findAll<
      Notebook & { 'pep.place.fullName'?: string; 'volunteer.NOME'?: string }
    >(options);

    return notebooks.map(evalutionListNotebookModelToEntityDownload);
  }

  async getReflections(date: string): Promise<RecletionsReturnType[]> {
    const notebooks = await sequelize.query<RecletionsReturnType>(
      `
      SELECT 
          c.\`NOME DO(A) ALUNO(A)\` AS name, 
          c.\`NÚMERO DE MATRÍCULA DO(A) ALUNO(A)\` AS registration, 
          pl.FullName AS prisonUnit, 
          c.\`CONTEÚDOS RELEVANTES\` AS relevantContents
      FROM Cadernos c
      INNER JOIN Pep pe ON c.IDPEP = pe.ID
      LEFT JOIN Place pl ON pe.IDPlace = pl.ID
      WHERE c.\`Carimbo de data/hora\` > :date
      AND c.\`CONTEÚDOS RELEVANTES\` IS NOT NULL
    `,
      {
        replacements: { date },
        type: QueryTypes.SELECT
      }
    );

    return notebooks;
  }
}
