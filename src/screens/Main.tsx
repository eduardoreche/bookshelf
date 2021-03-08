import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Router, RouteComponentProps, useNavigate } from '@reach/router';

import AuthorsScreen from './AuthorsScreen';
import PublishersScreen from './PublishersScreen';
import BooksScreen from './BooksScreen';
import LoginScreen from './LoginScreen';

import BookList from '../components/bookList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { fetchBooks } from '../store/actions/bookActions';
import { useAuth } from '../context/AuthContext';
import Header from '../components/header';

const MainHeader = (props: RouteComponentProps) => {
  const { books } = useSelector((state: RootState) => state.books);

  return <BookList books={books} />;
};

const AuthorRoute = (props: RouteComponentProps) => <AuthorsScreen />;
const PublisherRoute = (props: RouteComponentProps) => <PublishersScreen />;
const BookRoute = (props: RouteComponentProps) => <BooksScreen />;
const LoginRoute = (props: RouteComponentProps) => <LoginScreen />;

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser, logout, isLogingIn } = useAuth();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const privateRoutes = () => (
    <>
      <Header />
      <Box w='100%' h='100%' p={4} id='main'>
        <Router component={React.Fragment}>
          <MainHeader path='/' />
          <BookRoute path='/books' />
          <AuthorRoute path='/authors' />
          <PublisherRoute path='/publishers' />
        </Router>
      </Box>
    </>
  );

  const publicRoutes = () => (
    <Flex direction='column' minHeight='100vh' alignItems='center'>
      <Router component={React.Fragment}>
        <LoginRoute path='/login' default />
      </Router>
    </Flex>
  );

  return currentUser ? privateRoutes() : publicRoutes();
};

export default Main;
