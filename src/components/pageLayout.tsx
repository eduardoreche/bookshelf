import React from 'react';
import { Box } from '@chakra-ui/layout';

import Header from './header';

const PageLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Box p={10}>{children}</Box>
    </>
  );
};

export default PageLayout;
