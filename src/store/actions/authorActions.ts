import axios from "axios";

import Author from "../../models/Author";
import { FETCH_AUTHORS, ADD_AUTHOR } from "../types/authorTypes";
import { AppThunk } from "../types/appThunk";

const url = "https://book-shelf-3f772.firebaseio.com/authors.json";

export const fetchAuthors = (): AppThunk => async (dispatch) => {
  const { data } = await axios.get(url);
  const authors: Author[] = Object.keys(data).map((key) => {
    return { id: key, ...data[key] };
  });

  return dispatch({
    type: FETCH_AUTHORS,
    payload: authors,
  });
};

export const addAuthor = (author: Author): AppThunk => async (dispatch) => {
  const { data } = await axios.post<Author>(url, author);
  author.id = data.name;

  return dispatch({
    type: ADD_AUTHOR,
    payload: author,
  });
};
