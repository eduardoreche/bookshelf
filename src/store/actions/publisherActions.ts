import axios from 'axios';

import Publisher from '../../models/Publisher';
import {
  FETCH_PUBLISHERS,
  ADD_PUBLISHER,
  UPDATE_PUBLISHER,
  DELETE_PUBLISHER,
} from '../types/publisherTypes';
import { AppThunk } from '../types/appThunk';
import { getUrl } from './utils';

const COLLECTION_NAME = 'publishers';

export const fetchPublishers = (): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME);

  const { data } = await axios.get(url);
  if (data) {
    const publishers: Publisher[] = Object.keys(data).map((key) => {
      return { ...data[key], id: key };
    });

    return dispatch({
      type: FETCH_PUBLISHERS,
      payload: publishers,
    });
  }
};

export const findOrCreate = (name: string): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME);

  const { data } = await axios.get(
    `${url}&orderBy="name"&startAt="${name}"&endAt="${name}"`
  );

  if (Object.values(data).length <= 0) dispatch(addPublisher({ name }));
};

export const addPublisher = (publisher: Publisher): AppThunk => async (
  dispatch
) => {
  const url = await getUrl(COLLECTION_NAME);

  const { data } = await axios.post<Publisher>(url, publisher);
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
  const url = await getUrl(COLLECTION_NAME, id);

  await axios.put<Publisher>(url, rest);

  return dispatch({
    type: UPDATE_PUBLISHER,
    payload: publisher,
  });
};

export const deletePublisher = (id: string): AppThunk => async (dispatch) => {
  const url = await getUrl(COLLECTION_NAME, id);

  await axios.delete(url);

  return dispatch({
    type: DELETE_PUBLISHER,
    payload: id,
  });
};
