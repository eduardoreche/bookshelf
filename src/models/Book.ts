import TableModel from "./TableModel";
import Author from "./Author";
import Publisher from "./Publisher";

export interface BookAuthor {
  author: Author;
  credits: string[];
}

export default interface Book extends TableModel {
  authors: BookAuthor[];
  publisher: Publisher;
  language: string;
  printing: number;
  price?: number;
  stars?: number;
  volume?: string;
  imprint?: string;
  comments: string;
}
