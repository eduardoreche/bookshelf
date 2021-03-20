import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import Book from '../models/Book';
import BookTile from './bookTile';

type BookGridProp = {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete?: (id: string) => void;
};

const BookGrid = ({ books, onEdit, onDelete }: BookGridProp) => {
  return (
    <SimpleGrid
      pt={10}
      pl={20}
      pr={20}
      minChildWidth='300px'
      spacingX='20px'
      spacingY='20px'
    >
      {books && books.map((book) => <BookTile book={book} key={book.id} />)}
    </SimpleGrid>
  );
};

export default BookGrid;
