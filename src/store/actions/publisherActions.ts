import axios from "axios";

import Publisher from "../../models/Publisher";
import {
  FETCH_PUBLISHERS,
  ADD_PUBLISHER,
  UPDATE_PUBLISHER,
  DELETE_PUBLISHER,
} from "../types/publisherTypes";
import { AppThunk } from "../types/appThunk";

const url = "https://book-shelf-3f772.firebaseio.com/publishers";

export const fetchPublishers = (): AppThunk => async (dispatch) => {
  const { data } = await axios.get(`${url}.json`);
  const publishers: Publisher[] = Object.keys(data).map((key) => {
    return { id: key, ...data[key] };
  });

  return dispatch({
    type: FETCH_PUBLISHERS,
    payload: publishers,
  });
};

export const addPublisher = (publisher: Publisher): AppThunk => async (
  dispatch
) => {
  const { data } = await axios.post<Publisher>(`${url}.json`, publisher);
  publisher.id = data.name;

  return dispatch({
    type: ADD_PUBLISHER,
    payload: publisher,
  });
};

export const updatePublisher = (publisher: Publisher): AppThunk => async (
  dispatch
) => {
  const { id, ...rest } = publisher;
  await axios.put<Publisher>(`${url}/${publisher.id}.json`, rest);

  return dispatch({
    type: UPDATE_PUBLISHER,
    payload: publisher,
  });
};

export const deletePublisher = (id: string): AppThunk => async (dispatch) => {
  await axios.delete(`${url}/${id}.json`);

  return dispatch({
    type: DELETE_PUBLISHER,
    payload: id,
  });
};
