import {
  FETCH_AUTHORS,
  ADD_AUTHOR,
  UPDATE_AUTHOR,
  AuthorActionTypes,
  DELETE_AUTHOR,
} from "../types/authorTypes";

import Author from "../../models/Author";

const initialState = {
  authors: [],
};

const reducer = (state = initialState, action: AuthorActionTypes) => {
  switch (action.type) {
    case FETCH_AUTHORS:
      return { ...state, authors: action.payload };
    case ADD_AUTHOR:
      return { ...state, authors: [...state.authors, action.payload] };
    case UPDATE_AUTHOR:
      return {
        ...state,
        authors: state.authors.map((author: Author) =>
          author.id === action.payload.id ? action.payload : author
        ),
      };
    case DELETE_AUTHOR:
      return {
        ...state,
        authors: state.authors.filter(
          (author: Author) => author.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default reducer;
