import React from "react";
import { Box, Divider, Heading, Link, List, ListItem } from "@chakra-ui/react";
import { Router, RouteComponentProps, Link as ReachLink } from "@reach/router";

import AuthorsScreen from "./AuthorsScreen";
import PublishersScreen from "./PublishersScreen";

const MainHeader = (props: RouteComponentProps) => (
  <div>
    <Heading>Welcome!</Heading>
  </div>
);

const AuthorRoute = (props: RouteComponentProps) => <AuthorsScreen />;
const PublisherRoute = (props: RouteComponentProps) => <PublishersScreen />;

const Main: React.FC = () => {
  const menuItem = (to: string, name: string) => (
    <ListItem p={4} key={name}>
      <Link as={ReachLink} to={to}>
        {name}
      </Link>
    </ListItem>
  );

  return (
    <Box w="100%" p={4}>
      <Heading as="h1" size="4xl">
        My Books
      </Heading>

      <List d="flex">
        {menuItem("/", "Home")}
        {menuItem("/authors", "Authors")}
        {menuItem("/publishers", "Publishers")}
      </List>

      <Divider />

      <Router>
        <MainHeader path="/" />
        <AuthorRoute path="/authors" />
        <PublisherRoute path="/publishers" />
      </Router>
    </Box>
  );
};

export default Main;
