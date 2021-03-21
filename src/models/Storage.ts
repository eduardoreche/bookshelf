import Book from './Book';
import TableModel from './TableModel';

export default interface Storage extends TableModel {
  bookIds: Set<string>;
  books?: Set<Book>;
  photoUrl?: string;
  photo?: FileList;
  details: string;
}
