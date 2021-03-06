import React, { useEffect } from "react";
import { Box, Divider, Heading, Link, List, ListItem } from "@chakra-ui/react";
import { Router, RouteComponentProps, Link as ReachLink } from "@reach/router";

import AuthorsScreen from "./AuthorsScreen";
import SignUpScreen from "./SignUpScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import PublishersScreen from "./PublishersScreen";
import BooksScreen from "./BooksScreen";
import LoginScreen from "./LoginScreen";

import BookList from "../components/bookList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { fetchBooks } from "../store/actions/bookActions";
import { useAuth } from "../context/AuthContext";

const MainHeader = (props: RouteComponentProps) => {
  const { books } = useSelector((state: RootState) => state.books);

  return <BookList books={books} />;
};

const AuthorRoute = (props: RouteComponentProps) => <AuthorsScreen />;
const PublisherRoute = (props: RouteComponentProps) => <PublishersScreen />;
const BookRoute = (props: RouteComponentProps) => <BooksScreen />;
const LoginRoute = (props: RouteComponentProps) => <LoginScreen />;
const SignUpRoute = (props: RouteComponentProps) => <SignUpScreen />;
const ForgotRoute = (props: RouteComponentProps) => <ForgotPasswordScreen />;

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const menuItem = (to: string, name: string) => (
    <ListItem p={4} key={name}>
      <Link as={ReachLink} to={to}>
        {name}
      </Link>
    </ListItem>
  );

  const privateRoutes = () => (
    <Box w='100%' p={4}>
      <Heading as='h1' size='4xl'>
        My Books ({currentUser.email})
      </Heading>

      <List d='flex'>
        {menuItem("/", "Home")}
        {menuItem("/books", "Books")}
        {menuItem("/authors", "Authors")}
        {menuItem("/publishers", "Publishers")}
        <ListItem p={4} key={"logout"}>
          <Link onClick={() => logout()}>Logout</Link>
        </ListItem>
      </List>

      <Divider />

      <Router>
        <MainHeader path='/' />
        <BookRoute path='/books' />
        <AuthorRoute path='/authors' />
        <PublisherRoute path='/publishers' />
      </Router>
    </Box>
  );

  const publicRoutes = () => (
    <Box w='100%' p={4}>
      <Router>
        <SignUpRoute path='/signup' />
        <ForgotRoute path='/forgot' />
        <LoginRoute path='/login' default />
      </Router>
    </Box>
  );

  return currentUser ? privateRoutes() : publicRoutes();
};

export default Main;
