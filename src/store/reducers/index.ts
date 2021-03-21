import { combineReducers } from 'redux';

import authors from './authors';
import publishers from './publishers';
import books from './books';
import storages from './storages';

export const rootReducer = combineReducers({
  authors,
  publishers,
  books,
  storages,
});

export type RootState = ReturnType<typeof rootReducer>;
