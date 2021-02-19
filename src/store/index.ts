import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import { rootReducer } from "./reducers/index";

const createStoreMiddleware = applyMiddleware(reduxThunk)(createStore);

export default createStoreMiddleware(rootReducer);
