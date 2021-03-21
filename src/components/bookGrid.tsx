import React from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

import Book from '../models/Book';
import BookTile from './bookTile';

type BookGridProp = {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete?: (id: string) => void;
};

const BookGrid = ({ books, onEdit, onDelete }: BookGridProp) => {
  return (
    <Box pt={10} pl={20} pr={20} pb={20}>
      <Heading as='h4' mb={10}>
        {books.length} Books in your Bookshell
      </Heading>
      <SimpleGrid minChildWidth='300px' spacingX='20px' spacingY='20px'>
        {books && books.map((book) => <BookTile book={book} key={book.id} />)}
      </SimpleGrid>
    </Box>
  );
};

export default BookGrid;
