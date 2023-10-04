import { PepClassEntity } from '../pep-class/pep-class-entity';

export type NotebookEntity = {
  idcad: number;
  idvol: number | null;
  idpep?: number;
  studentName: string;
  studentRegistration: number;
  studentPrisonUnit?: string;
  evaluatorName: string;
  evaluatorEmail?: string;
  subject1?: string;
  subject2?: string;
  subject3?: string;
  subject4?: string;
  subject5?: string;
  subject6?: string;
  subject7?: string;
  subject8?: string;
  subject9?: string;
  subject10?: string;
  relevantContent?: string;
  a1?: string;
  a2?: string;
  a3?: string;
  a4?: string;
  a5?: string;
  a6?: string;
  a7?: string;
  a8?: string;
  a9?: string;
  a10?: string;
  a11?: string;
  a12?: string;
  a13?: string;
  conclusion: string;
  approved: boolean;
  archivesExclusion: boolean;
  evaluatedDate?: Date | null;
  reservationDate?: Date | null;
} & Pick<PepClassEntity, 'notebookDirectory'>;
