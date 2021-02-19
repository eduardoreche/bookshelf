import TableModel from "./TableModel";
import Author from "./Author";
import Publisher from "./Publisher";

export default interface Book extends TableModel {
  name: string;
  authors: Author[];
  publisher: Publisher;
  language: string;
  printing: number;
  price?: number;
  stars?: number;
  vol?: string;
  imprint?: string;
}
