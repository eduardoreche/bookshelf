import {
  FETCH_PUBLISHERS,
  ADD_PUBLISHER,
  PublisherActionTypes,
} from "../types/publisherTypes";

const initialState = {
  publishers: [],
};

const reducer = (state = initialState, action: PublisherActionTypes) => {
  switch (action.type) {
    case FETCH_PUBLISHERS:
      return { ...state, publishers: action.payload };
    case ADD_PUBLISHER:
      return { ...state, publishers: [...state.publishers, action.payload] };
    default:
      return state;
  }
};

export default reducer;
