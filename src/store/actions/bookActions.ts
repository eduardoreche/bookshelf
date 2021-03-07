import axios from 'axios';

import Book from '../../models/Book';
import {
  FETCH_BOOKS,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
} from '../types/bookTypes';
import { AppThunk } from '../types/appThunk';
import { getUrl } from './utils';

const COLLECTION_NAME = 'books';

export const fetchBooks = (): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME);

  const { data } = await axios.get(url);
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
  const url = await getUrl(COLLECTION_NAME);

  const { data } = await axios.post<Book>(url, newBook);
  book.id = data.name;

  return dispatch({
    type: ADD_BOOK,
    payload: book,
  });
};

export const updateBook = (book: Book): AppThunk => async (dispatch) => {
  const { id, ...rest } = book;
  const url = await getUrl(COLLECTION_NAME, id);
  await axios.put<Book>(url, rest);

  return dispatch({
    type: UPDATE_BOOK,
    payload: book,
  });
};

export const deleteBook = (id: string): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME, id);
  await axios.delete(url);

  return dispatch({
    type: DELETE_BOOK,
    payload: id,
  });
};
