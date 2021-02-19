import Publisher from "../../models/Publisher";
import {
  FETCH_PUBLISHERS,
  ADD_PUBLISHER,
  PublisherActionTypes,
  DELETE_PUBLISHER,
  UPDATE_PUBLISHER,
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
    case UPDATE_PUBLISHER:
      return {
        ...state,
        publishers: state.publishers.map((publisher: Publisher) =>
          publisher.id === action.payload.id ? action.payload : publisher
        ),
      };
    case DELETE_PUBLISHER:
      return {
        ...state,
        publishers: state.publishers.filter(
          (publisher: Publisher) => publisher.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default reducer;
