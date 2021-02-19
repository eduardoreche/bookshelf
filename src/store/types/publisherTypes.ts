import Publisher from "../../models/Publisher";

export const FETCH_PUBLISHERS = "FETCH_PUBLISHERS";
export const GET_PUBLISHER = "GET_PUBLISHER";
export const ADD_PUBLISHER = "ADD_PUBLISHER";
export const UPDATE_PUBLISHER = "UPDATE_PUBLISHER";
export const DELETE_PUBLISHER = "DELETE_PUBLISHER";

interface FetchPublishersAction {
  type: typeof FETCH_PUBLISHERS;
  payload: Publisher[];
}

interface GetPublisher {
  type: typeof GET_PUBLISHER;
  payload: number;
}

interface AddPublisher {
  type: typeof ADD_PUBLISHER;
  payload: Publisher;
}

interface UpdatePublisher {
  type: typeof UPDATE_PUBLISHER;
  payload: Publisher;
}

interface DeletePublisher {
  type: typeof DELETE_PUBLISHER;
  payload: string;
}

export type PublisherActionTypes =
  | FetchPublishersAction
  | GetPublisher
  | AddPublisher
  | UpdatePublisher
  | DeletePublisher;
