import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import Book from '../models/Book';

type BookListProps = {
  books: Book[];
};

const BookList = ({ books }: BookListProps) => {
  return (
    <Box w='100%'>
      {books.length > 0 && (
        <Table variant='striped' colorScheme='gray' m={3}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Volume</Th>
              <Th>Language</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book) => (
              <Tr key={book.id}>
                <Td>{book.name}</Td>
                <Td>{book.volume}</Td>
                <Td>{book.language}</Td>
                <Td>
                  <IconButton
                    aria-label='Delete'
                    variant='outline'
                    colorScheme='red'
                    icon={<CloseIcon />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default BookList;
