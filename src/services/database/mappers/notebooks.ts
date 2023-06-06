import NotebooksEntity from '@src/domain/entities/notebooks-entity';
import { Notebooks } from '../models/notebooks';

export const notebookModelToEntity = (
  notebook: Notebooks
): NotebooksEntity => ({
  idcad: notebook.idcad,
  idvol: notebook.idvol,
  studentName: notebook['nome do(a) aluno(a)'],
  studentRegistration: Number(notebook['número de matrícula do(a) aluno(a)']),
  studentPrisonUnit: notebook['unidade prisional do(a) aluno(a)'],
  evaluatorName: notebook.naval,
  evaluatorEmail: notebook['endereço de e-mail'],
  subject1: notebook['tema 1'],
  subject2: notebook['tema 2'],
  subject3: notebook['tema 3'],
  subject4: notebook['tema 4'],
  subject5: notebook['tema 5'],
  subject6: notebook['tema 6'],
  subject7: notebook['tema 7'],
  subject8: notebook['tema 8'],
  subject9: notebook['tema 9'],
  subject10: notebook['tema 10'],
  relevantContent: notebook['conteúdos relevantes'],
  a1: notebook.a1,
  a2: notebook.a2,
  a3: notebook.a3,
  a4: notebook.a4,
  a5: notebook.a5,
  a6: notebook.a6,
  a7: notebook.a7,
  a8: notebook.a8,
  a9: notebook.a9,
  a10: notebook.a10,
  a11: notebook.a11,
  a12: notebook.a12,
  a13: notebook.a13,
  conclusion: notebook['conclusão do avaliador'],
  archivesExclusion: notebook['exclusão de arquivos recebidos'] === 'SIM',
  createdAt: notebook.createdAt
});
