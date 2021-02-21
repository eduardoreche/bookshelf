import axios from "axios";

import Book from "../../models/Book";
import {
  FETCH_BOOKS,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
} from "../types/bookTypes";
import { AppThunk } from "../types/appThunk";

const url = "https://book-shelf-3f772.firebaseio.com/books";

export const fetchBooks = (): AppThunk => async (dispatch) => {
  const { data } = await axios.get(`${url}.json`);
  if (data) {
    const books: Book[] = Object.keys(data).map((key) => {
      return { ...data[key], id: key };
    });

    return dispatch({
      type: FETCH_BOOKS,
      payload: books,
    });
  }
};

export const addBook = (book: Book): AppThunk => async (dispatch) => {
  const { id, ...newBook } = book;
  const { data } = await axios.post<Book>(`${url}.json`, newBook);
  book.id = data.name;

  return dispatch({
    type: ADD_BOOK,
    payload: book,
  });
};

export const updateBook = (book: Book): AppThunk => async (dispatch) => {
  const { id, ...rest } = book;
  await axios.put<Book>(`${url}/${book.id}.json`, rest);

  return dispatch({
    type: UPDATE_BOOK,
    payload: book,
  });
};

export const deleteBook = (id: string): AppThunk => async (dispatch) => {
  await axios.delete(`${url}/${id}.json`);

  return dispatch({
    type: DELETE_BOOK,
    payload: id,
  });
};
