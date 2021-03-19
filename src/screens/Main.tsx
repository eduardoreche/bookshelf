import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Router, RouteComponentProps } from '@reach/router';

import AuthorsScreen from './AuthorsScreen';
import PublishersScreen from './PublishersScreen';
import BooksScreen from './BooksScreen';
import LoginScreen from './LoginScreen';

import { useAuth } from '../context/AuthContext';
import HomeScreen from './HomeScreen';

const MainHeader = (props: RouteComponentProps) => <HomeScreen />;
const AuthorRoute = (props: RouteComponentProps) => <AuthorsScreen />;
const PublisherRoute = (props: RouteComponentProps) => <PublishersScreen />;
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
