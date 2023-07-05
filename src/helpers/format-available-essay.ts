import AvailableEssayRowEntity from '@src/domain/entities/book-club-class/available-essay-row-entity';
import { AssociatedBCCEntity } from '@src/domain/entities/book-club-class/book-club-class';

export const formatAvailableEssay = ({
  place,
  sendDateParec,
  endEvaluationDate,
  folderLink
}: AssociatedBCCEntity): AvailableEssayRowEntity => ({
  place: place?.fullName,
  dateReserved: sendDateParec,
  dateConcluded: endEvaluationDate,
  folderLink
});
