import Author from "../../models/Author";

export const FETCH_AUTHORS = "FETCH_AUTHORS";
export const GET_AUTHOR = "GET_AUTHOR";
export const ADD_AUTHOR = "ADD_AUTHOR";
export const UPDATE_AUTHOR = "UPDATE_AUTHOR";
export const DELETE_AUTHOR = "DELETE_AUTHOR";

interface FetchAuthorsAction {
  type: typeof FETCH_AUTHORS;
  payload: Author[];
}

interface GetAuthor {
  type: typeof GET_AUTHOR;
  payload: number;
}

interface AddAuthor {
  type: typeof ADD_AUTHOR;
  payload: Author;
}

interface UpdateAuthor {
  type: typeof UPDATE_AUTHOR;
  payload: Author;
}

interface DeleteAuthor {
  type: typeof DELETE_AUTHOR;
  payload: string;
}

export type AuthorActionTypes =
  | FetchAuthorsAction
  | GetAuthor
  | AddAuthor
  | UpdateAuthor
  | DeleteAuthor;
