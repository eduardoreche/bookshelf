import axios from 'axios';

import Author from '../../models/Author';
import {
  FETCH_AUTHORS,
  ADD_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
} from '../types/authorTypes';
import { AppThunk } from '../types/appThunk';
import { getUrl } from './utils';

const COLLECTION_NAME = 'authors';

export const fetchAuthors = (): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME);
  const { data } = await axios.get(url);
  if (data) {
    const authors: Author[] = Object.keys(data).map((key) => {
      return { ...data[key], id: key };
    });

    return dispatch({
      type: FETCH_AUTHORS,
      payload: authors,
    });
  }
};

export const findOrCreate = (name: string): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME);

  const { data } = await axios.get(
    `${url}&orderBy="name"&startAt="${name}"&endAt="${name}"`
  );

  if (Object.values(data).length <= 0) dispatch(addAuthor({ name }));
};

export const addAuthor = (author: Author): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME);
  const { data } = await axios.post<Author>(url, author);
  author.id = data.name;

  return dispatch({
    type: ADD_AUTHOR,
    payload: author,
  });
};

export const updateAuthor = (author: Author): AppThunk => async (dispatch) => {
  const { id, ...rest } = author;
  const url = await getUrl(COLLECTION_NAME, id);
  await axios.put<Author>(url, rest);

  return dispatch({
    type: UPDATE_AUTHOR,
    payload: author,
  });
};

export const deleteAuthor = (id: string): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME, id);
  await axios.delete(url);

  return dispatch({
    type: DELETE_AUTHOR,
    payload: id,
  });
};
