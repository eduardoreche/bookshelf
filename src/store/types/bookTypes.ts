import Book from "../../models/Book";

export const FETCH_BOOKS = "FETCH_BOOKS";
export const GET_BOOK = "GET_BOOK";
export const ADD_BOOK = "ADD_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";

interface FetchBooksAction {
  type: typeof FETCH_BOOKS;
  payload: Book[];
}

interface GetBook {
  type: typeof GET_BOOK;
  payload: number;
}

interface AddBook {
  type: typeof ADD_BOOK;
  payload: Book;
}

interface UpdateBook {
  type: typeof UPDATE_BOOK;
  payload: Book;
}

interface DeleteBook {
  type: typeof DELETE_BOOK;
  payload: string;
}

export type BookActionTypes =
  | FetchBooksAction
  | GetBook
  | AddBook
  | UpdateBook
  | DeleteBook;
