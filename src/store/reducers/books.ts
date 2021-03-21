import {
  FETCH_BOOKS,
  ADD_BOOK,
  UPDATE_BOOK,
  BookActionTypes,
  DELETE_BOOK,
} from '../types/bookTypes';

import Book from '../../models/Book';

const initialState = {
  books: [] as Book[],
};

const reducer = (state = initialState, action: BookActionTypes) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, books: action.payload };
    case ADD_BOOK:
      return { ...state, books: [...state.books, action.payload] };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book: Book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book: Book) => book.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
