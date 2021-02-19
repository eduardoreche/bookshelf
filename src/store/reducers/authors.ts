import {
  FETCH_AUTHORS,
  ADD_AUTHOR,
  AuthorActionTypes,
} from "../types/authorTypes";

const initialState = {
  authors: [],
};

const reducer = (state = initialState, action: AuthorActionTypes) => {
  console.log(action.type, action.payload);
  console.log(state);

  switch (action.type) {
    case FETCH_AUTHORS:
      return { ...state, authors: action.payload };
    case ADD_AUTHOR:
      return { ...state, authors: [...state.authors, action.payload] };
    default:
      return state;
  }
};

export default reducer;
