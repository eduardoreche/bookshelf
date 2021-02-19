import axios from "axios";

import Publisher from "../../models/Publisher";
import { FETCH_PUBLISHERS, ADD_PUBLISHER } from "../types/publisherTypes";
import { AppThunk } from "../types/appThunk";

const url = "https://book-shelf-3f772.firebaseio.com/publishers.json";

export const fetchPublishers = (): AppThunk => async (dispatch) => {
  const { data } = await axios.get(url);
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
  const { data } = await axios.post<Publisher>(url, publisher);
  publisher.id = data.name;

  return dispatch({
    type: ADD_PUBLISHER,
    payload: publisher,
  });
};
