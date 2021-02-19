import TableModel from "./TableModel";

export default interface Author extends TableModel {
  name: string;
  country: string;
}
