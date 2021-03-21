import {
  FETCH_STORAGES,
  ADD_STORAGE,
  UPDATE_STORAGE,
  StorageActionTypes,
  DELETE_STORAGE,
} from '../types/storageTypes';

import Storage from '../../models/Storage';

const initialState = {
  storages: [] as Storage[],
};

const reducer = (state = initialState, action: StorageActionTypes) => {
  switch (action.type) {
    case FETCH_STORAGES:
      return { ...state, storages: action.payload };
    case ADD_STORAGE:
      return { ...state, storages: [...state.storages, action.payload] };
    case UPDATE_STORAGE:
      return {
        ...state,
        storages: state.storages.map((storage: Storage) =>
          storage.id === action.payload.id ? action.payload : storage
        ),
      };
    case DELETE_STORAGE:
      return {
        ...state,
        storages: state.storages.filter(
          (storage: Storage) => storage.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default reducer;
