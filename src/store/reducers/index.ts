import { combineReducers } from "redux";

import authors from "./authors";
import publishers from "./publishers";

export const rootReducer = combineReducers({
  authors,
  publishers,
});

export type RootState = ReturnType<typeof rootReducer>;
