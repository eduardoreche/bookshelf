import React from 'react';
import { useNavigate } from '@reach/router';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import {
  FaBook,
  FaBookDead,
  FaHome,
  FaPencilAlt,
  FaPrint,
  FaUserCircle,
} from 'react-icons/fa';
import { SearchIcon } from '@chakra-ui/icons';

const Header = () => {
  return (
    <Flex p={5} backgroundColor='black' flexDirection='row'>
      <Heading mr={10}>Book Shelf</Heading>

      <Flex
        justifyContent='space-around'
        justifyItems='center'
        alignItems='center'
        fontSize='lg'
      >
        <Button
          leftIcon={<Icon as={FaHome} fontSize='xl' />}
          variant='ghost'
          onClick={() => null}
        >
          Home
        </Button>

        <Button
          leftIcon={<Icon as={FaBook} fontSize='xl' />}
          variant='ghost'
          onClick={() => null}
        >
          Books
        </Button>

        <Button
          leftIcon={<Icon as={FaPencilAlt} fontSize='xl' />}
          variant='ghost'
          onClick={() => null}
        >
          Authors
        </Button>

        <Button
          leftIcon={<Icon as={FaPrint} fontSize='xl' />}
          variant='ghost'
          onClick={() => null}
        >
          Publishers
        </Button>
      </Flex>

      <Spacer />

      <Flex alignItems='center'>
        <InputGroup mr={5}>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' />}
          />
          <Input type='text' placeholder='Search' />
        </InputGroup>

        <Text fontSize='xl'>
          <FaUserCircle />
        </Text>
        <Text fontSize='md' ml={3}>
          Eduardo
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
