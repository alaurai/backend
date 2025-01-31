import { CreateVolunteerEntity } from '@src/domain/entities/volunteer/create-volunteer-entity';
import { PermissionEntity } from '@src/domain/entities/volunteer/permission-entity';
import { UpdateVolunteerEntity } from '@src/domain/entities/volunteer/update-volunteer-entity';
import { VolunteerDownloadEntity } from '@src/domain/entities/volunteer/volunteer-download-entity';
import { VolunteerEntity } from '@src/domain/entities/volunteer/volunteer-entity';
import { VolunteerHoursEntity } from '@src/domain/entities/volunteer/volunteer-hours-entity';
import { VolunteerWithAuthEntity } from '@src/domain/entities/volunteer/volunteer-with-auth-entity';
import { VolunteerError } from '@src/domain/errors/volunteer';
import { VolunteerRepository } from '@src/domain/interfaces/repositories/volunteer-repository';
import { hashString } from '@src/helpers/message-hashing';
import { provideSingleton } from '@src/helpers/provide-singleton';
import { PaginationParams } from '@src/presentation/types/paginationParams';
import {
  createVolunteerEntityToCreationModel,
  updateVolunteerEntityToUpdateModel,
  volunteerDownloadMappers,
  volunteerModelToAuthEntity,
  volunteerModelToEntity
} from '@src/services/database/mappers/volunteer';
import { Volunteer } from '@src/services/database/models/volunteer';
import moment from 'moment';
import { CreationAttributes, Op, UniqueConstraintError } from 'sequelize';
import { authorizationModelToEntity } from '../database/mappers/authorization';
import { Authorization } from '../database/models/authorization';
import { VolunteerHours } from '../database/models/hours';
import { wrapPagination } from './helpers/wrapPagination';

@provideSingleton(SequelizeVolunteerRepository)
export class SequelizeVolunteerRepository implements VolunteerRepository {
  getVolunteersFromDate = wrapPagination(
    async (
      pagination: PaginationParams,
      date: Date
    ): Promise<[VolunteerEntity[], number]> => {
      const { filter, ...paginationRest } = pagination;
      const volunteers = await Volunteer.findAll({
        where: {
          createdAt: { [Op.gte]: date },
          ...filter
        },
        ...paginationRest
      });

      const totalCount = await Volunteer.count({
        where: {
          createdAt: { [Op.gte]: date },
          ...filter
        }
      });

      return [volunteers.map(volunteerModelToEntity), totalCount];
    }
  );

  async getVolunteersDownloadFromDate(
    date: Date
  ): Promise<VolunteerDownloadEntity[]> {
    const volunteers = await Volunteer.findAll({
      where: {
        createdAt: { [Op.gte]: date }
      },
      order: [['createdAt', 'DESC']],
      raw: true
    });

    return volunteers.map(volunteerDownloadMappers);
  }
  async getPermissionByAuthName(
    name: string
  ): Promise<PermissionEntity | null> {
    const permissions = await Authorization.findOne({ where: { name: name } });
    return permissions ? authorizationModelToEntity(permissions) : null;
  }

  async updateOrCreatePasswordForEmail(
    email: string,
    password: string
  ): Promise<boolean> {
    const updatedRows = (
      await Volunteer.update(
        { senha: hashString(password) },
        { where: { 'e-mail': email } }
      )
    )[0];
    return updatedRows ? true : false;
  }

  async getVolunteerWithAuthDataByEmail(
    email: string
  ): Promise<VolunteerWithAuthEntity | null> {
    const volunteer = await Volunteer.findOne({ where: { 'e-mail': email } });
    return volunteer ? volunteerModelToAuthEntity(volunteer) : null;
  }

  async updateVolunteer(
    volunteer: UpdateVolunteerEntity,
    email: string,
    hasClass: boolean
  ): Promise<VolunteerEntity | null> {
    try {
      const updatedVolunteer = updateVolunteerEntityToUpdateModel(volunteer);

      if (hasClass) {
        updatedVolunteer.idpep = 0;
        updatedVolunteer.createdAt = new Date();
      }

      await Volunteer.update(updatedVolunteer, {
        where: { 'e-mail': email }
      });

      const emailUpdated = updatedVolunteer?.['e-mail']
        ? updatedVolunteer['e-mail']
        : email;

      return this.getVolunteerByEmail(emailUpdated);
    } catch (error) {
      throw new VolunteerError({
        name: 'VOLUNTEER_NOT_UPDATED',
        message: `Volunteer with email ${email} not updated`
      });
    }
  }

  async getVolunteerByEmail(email: string): Promise<VolunteerEntity | null> {
    const volunteer = await Volunteer.findOne({ where: { 'e-mail': email } });
    return volunteer ? volunteerModelToEntity(volunteer) : null;
  }

  async getVolunteerById(id: number): Promise<VolunteerEntity | null> {
    const volunteer = await Volunteer.findOne({ where: { idvol: id } });
    return volunteer ? volunteerModelToEntity(volunteer) : null;
  }

  async getAllVolunteers(): Promise<VolunteerEntity[]> {
    const volunteers = await Volunteer.findAll();
    return volunteers.map(volunteerModelToEntity);
  }

  async createVolunteer(
    volunteer: CreateVolunteerEntity
  ): Promise<VolunteerEntity> {
    try {
      const result = await Volunteer.create(
        createVolunteerEntityToCreationModel(volunteer)
      );
      return volunteerModelToEntity(result);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new VolunteerError({
          name: 'VOLUNTEER_ALREADY_EXISTS',
          message: `Volunteer with email ${volunteer.email} already exists`
        });
      }
      throw new VolunteerError({
        name: 'UNSPECIFIED_ERROR',
        message: 'not specified error',
        details: error
      });
    }
  }

  async deleteVolunteerByEmail(email: string): Promise<boolean> {
    const deletedVolunteers = await Volunteer.destroy({
      where: { 'e-mail': email }
    });

    return deletedVolunteers ? true : false;
  }

  async postVolunteerHours(
    data: CreationAttributes<VolunteerHours>
  ): Promise<void> {
    await VolunteerHours.create(data);
  }

  async findHoursByMonth(
    idVol: number,
    month: number,
    year: number
  ): Promise<VolunteerHoursEntity | null> {
    const currentDate = moment([year, month]).toDate();
    return VolunteerHours.findOne({
      where: {
        idVol,
        createdAt: {
          [Op.gt]: currentDate
        }
      }
    });
  }
}
