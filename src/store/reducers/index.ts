import { combineReducers } from "redux";

import authors from "./authors";
import publishers from "./publishers";
import books from "./books";

export const rootReducer = combineReducers({
  authors,
  publishers,
  books,
});

export type RootState = ReturnType<typeof rootReducer>;
