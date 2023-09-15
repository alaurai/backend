import { UpdateVolunteerEntity } from '@src/domain/entities/volunteer/update-volunteer-entity';
import { VolunteerEntity } from '@src/domain/entities/volunteer/volunteer-entity';
import { VolunteerWithAuthEntity } from '@src/domain/entities/volunteer/volunteer-with-auth-entity';
import { CreateVolunteerEntity } from '@src/domain/entities/volunteer/create-volunteer-entity';
import { PermissionEntity } from '@src/domain/entities/volunteer/permission-entity';

export interface VolunteerRepository {
  updateVolunteer(
    volunteer: UpdateVolunteerEntity,
    email: string
  ): Promise<VolunteerEntity | null>;

  getVolunteersFromDate(date: Date): Promise<VolunteerEntity[]>;

  getVolunteerByEmail(email: string): Promise<VolunteerEntity | null>;

  getVolunteerById(id: number): Promise<VolunteerEntity | null>;

  getPermissionByAuthName(name: string): Promise<PermissionEntity | null>;

  getVolunteerWithAuthDataByEmail(
    email: string
  ): Promise<VolunteerWithAuthEntity | null>;

  getAllVolunteers(): Promise<VolunteerEntity[]>;

  createVolunteer(volunteer: CreateVolunteerEntity): Promise<VolunteerEntity>;

  deleteVolunteerByEmail(email: string): Promise<boolean>;

  updateOrCreatePasswordForEmail(
    email: string,
    password: string
  ): Promise<boolean>;
}
