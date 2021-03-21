import TableModel from './TableModel';

export interface BookAuthor {
  author: string;
  credits: string[];
}

export default interface Book extends TableModel {
  authors: BookAuthor[];
  publisher: string;
  language: string;
  printing: number;
  price?: number;
  stars?: number;
  volume?: string;
  imprint?: string;
  comments: string;
  cover?: FileList;
  imageUrls: string[];
  storage?: string;
}
