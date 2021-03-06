import axios from "axios";

import Author from "../../models/Author";
import {
  FETCH_AUTHORS,
  ADD_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
} from "../types/authorTypes";
import { AppThunk } from "../types/appThunk";

const url = "https://book-shelf-3f772.firebaseio.com/authors";

export const fetchAuthors = (): AppThunk => async (dispatch) => {
  const { data } = await axios.get(`${url}.json`);
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
  debugger;
  const { data } = await axios.get(
    `${url}.json?orderBy="name"&startAt="${name}"&endAt="${name}"`
  );

  if (Object.values(data).length <= 0) dispatch(addAuthor({ name }));
};

export const addAuthor = (author: Author): AppThunk => async (dispatch) => {
  const { data } = await axios.post<Author>(`${url}.json`, author);
  author.id = data.name;

  return dispatch({
    type: ADD_AUTHOR,
    payload: author,
  });
};

export const updateAuthor = (author: Author): AppThunk => async (dispatch) => {
  const { id, ...rest } = author;
  await axios.put<Author>(`${url}/${author.id}.json`, rest);

  return dispatch({
    type: UPDATE_AUTHOR,
    payload: author,
  });
};

export const deleteAuthor = (id: string): AppThunk => async (dispatch) => {
  await axios.delete(`${url}/${id}.json`);

  return dispatch({
    type: DELETE_AUTHOR,
    payload: id,
  });
};
