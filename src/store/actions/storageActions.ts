import axios from 'axios';

import Storage from '../../models/Storage';
import {
  FETCH_STORAGES,
  ADD_STORAGE,
  UPDATE_STORAGE,
  DELETE_STORAGE,
  ADD_BOOK_TO_STORAGE,
  REMOVE_BOOK_TO_STORAGE,
} from '../types/storageTypes';
import { AppThunk } from '../types/appThunk';
import { getUrl } from './utils';
import Book from '../../models/Book';

const COLLECTION_NAME = 'storages';

export const fetchStorages = (): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME);
  const { data } = await axios.get(url);
  if (data) {
    const storages: Storage[] = Object.keys(data).map((key) => {
      return { ...data[key], id: key };
    });

    return dispatch({
      type: FETCH_STORAGES,
      payload: storages,
    });
  }
};

export const addStorage = (storage: Storage): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME);
  const { data } = await axios.post<Storage>(url, storage);
  storage.id = data.name;

  return dispatch({
    type: ADD_STORAGE,
    payload: storage,
  });
};

export const updateStorage = (storage: Storage): AppThunk => async (
  dispatch
) => {
  const { id, ...rest } = storage;
  const url = await getUrl(COLLECTION_NAME, id);
  await axios.put<Storage>(url, rest);

  return dispatch({
    type: UPDATE_STORAGE,
    payload: storage,
  });
};

export const deleteStorage = (id: string): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME, id);
  await axios.delete(url);

  return dispatch({
    type: DELETE_STORAGE,
    payload: id,
  });
};

export const addBookToStorage = function (
  storage: Storage,
  book: Book
): AppThunk {
  return async (dispatch) => {
    if (book.id) storage.bookIds.add(book.id);

    dispatch(updateStorage(storage));

    return dispatch({
      type: ADD_BOOK_TO_STORAGE,
      storage: storage,
      book: book,
    });
  };
};

export const removeBookFromStorage = function (
  storage: Storage,
  book: Book
): AppThunk {
  return async (dispatch) => {
    if (book.id) storage.bookIds.delete(book.id);
    //TODO

    dispatch(updateStorage(storage));

    return dispatch({
      type: REMOVE_BOOK_TO_STORAGE,
      storage: storage,
      book: book,
    });
  };
};
