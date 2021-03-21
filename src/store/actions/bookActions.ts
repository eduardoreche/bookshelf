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
import { storage } from '../../firebase';

const COLLECTION_NAME = 'books';

export const fetchBooks = (): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME);

  const { data } = await axios.get(url);
  if (data) {
    const books = await Promise.all(
      Object.keys(data).map(async (key) => {
        const imageUrls = await fetchBookImages(key);

        return { ...data[key], id: key, imageUrls };
      })
    );

    return dispatch({
      type: FETCH_BOOKS,
      payload: books,
    });
  }
};

const fetchBookImages = async (id: string) => {
  const filesRef = storage.ref(id);
  const files = await filesRef.listAll();

  return await Promise.all(
    files.items.map(async (file) => await file.getDownloadURL())
  );
};

export const addBook = (book: Book): AppThunk => async (dispatch) => {
  const { id, ...newBook } = book;
  const url = await getUrl(COLLECTION_NAME);

  const { data } = await axios.post<Book>(url, newBook);
  book.id = data.name;

  uploadFiles(book);

  return dispatch({
    type: ADD_BOOK,
    payload: book,
  });
};

const uploadFiles = (book: Book) => {
  if (book.cover) {
    Array.from(book.cover).forEach((image) => {
      const storageRef = storage.ref(`${book.id}/${image.name}`);
      storageRef.child(image.name);
      storageRef.put(image);
    });
  }
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
  deleteImages(id);

  return dispatch({
    type: DELETE_BOOK,
    payload: id,
  });
};

const deleteImages = (id: string) => {
  try {
    const storageRef = storage.ref(id);
    storageRef.delete();
  } catch (error) {
    //do nothing
  }
};
