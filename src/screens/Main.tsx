import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Router, RouteComponentProps } from '@reach/router';

import AuthorsScreen from './AuthorsScreen';
import PublishersScreen from './PublishersScreen';
import BooksScreen from './BooksScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import StorageScreen from './StorageScreen';

import { useAuth } from '../context/AuthContext';

const MainHeader = (props: RouteComponentProps) => <HomeScreen />;
const AuthorRoute = (props: RouteComponentProps) => <AuthorsScreen />;
const PublisherRoute = (props: RouteComponentProps) => <PublishersScreen />;
const StorageRoute = (props: RouteComponentProps) => <StorageScreen />;
const BookRoute = (props: RouteComponentProps) => <BooksScreen />;
const LoginRoute = (props: RouteComponentProps) => <LoginScreen />;

const Main: React.FC = () => {
  const { currentUser } = useAuth();

  const privateRoutes = () => (
    <Router>
      <MainHeader path='/' />
      <BookRoute path='/books' />
      <AuthorRoute path='/authors' />
      <PublisherRoute path='/publishers' />
      <StorageRoute path='/storages' />
    </Router>
  );

  const publicRoutes = () => (
    <Flex direction='column' minHeight='100vh' alignItems='center'>
      <Router>
        <LoginRoute path='/login' default />
      </Router>
    </Flex>
  );

  return currentUser ? privateRoutes() : publicRoutes();
};

export default Main;
