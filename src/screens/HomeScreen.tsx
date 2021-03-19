import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookList from '../components/bookList';
import Header from '../components/header';
import { fetchBooks } from '../store/actions/bookActions';
import { RootState } from '../store/reducers';

const HomeScreen = () => {
  const { books } = useSelector((state: RootState) => state.books);
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchBooks());
      setIsInitialized(true);
    }
  }, [dispatch, isInitialized]);

  return (
    <>
      <Header />
      <BookList books={books} />
    </>
  );
};

export default HomeScreen;
