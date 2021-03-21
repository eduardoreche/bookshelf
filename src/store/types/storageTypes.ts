import Book from '../../models/Book';
import Storage from '../../models/Storage';

export const FETCH_STORAGES = 'FETCH_STORAGES';
export const GET_STORAGE = 'GET_STORAGE';
export const ADD_STORAGE = 'ADD_STORAGE';
export const UPDATE_STORAGE = 'UPDATE_STORAGE';
export const DELETE_STORAGE = 'DELETE_STORAGE';
export const ADD_BOOK_TO_STORAGE = 'ADD_BOOK_TO_STORAGE';
export const REMOVE_BOOK_TO_STORAGE = 'REMOVE_BOOK_TO_STORAGE';

interface FetchStoragesAction {
  type: typeof FETCH_STORAGES;
  payload: Storage[];
}

interface GetStorage {
  type: typeof GET_STORAGE;
  payload: number;
}

interface AddStorage {
  type: typeof ADD_STORAGE;
  payload: Storage;
}

interface UpdateStorage {
  type: typeof UPDATE_STORAGE;
  payload: Storage;
}

interface DeleteStorage {
  type: typeof DELETE_STORAGE;
  payload: string;
}

interface AddBookToStorage {
  type: typeof ADD_BOOK_TO_STORAGE;
  storage: Storage;
  book: Book;
}

interface RemoveBookToStorage {
  type: typeof ADD_BOOK_TO_STORAGE;
  storage: Storage;
  book: Book;
}

export type StorageActionTypes =
  | FetchStoragesAction
  | GetStorage
  | AddStorage
  | UpdateStorage
  | DeleteStorage
  | AddBookToStorage
  | RemoveBookToStorage;
