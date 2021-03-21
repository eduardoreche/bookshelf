import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

import Book from '../models/Book';
import BookTile from './bookTile';
import { sortObjectArray } from '../utils/sort';

type BookGridProp = {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete?: (id: string) => void;
  orderBy?: string;
};

const BookGrid = ({ books, onEdit, onDelete, orderBy }: BookGridProp) => {
  const [sortedItems, setSortedItems] = useState<any[]>([]);

  useEffect(() => {
    const sortField = orderBy || 'name';

    setSortedItems(sortObjectArray(books, sortField));
  }, [orderBy, books]);

  return (
    <Box pt={10} pl={20} pr={20} pb={20}>
      <Heading as='h4' mb={10}>
        {sortedItems.length} Books in your Shelf
      </Heading>
      <SimpleGrid minChildWidth='300px' spacingX='20px' spacingY='20px'>
        {sortedItems &&
          sortedItems.map((book) => <BookTile book={book} key={book.id} />)}
      </SimpleGrid>
    </Box>
  );
};

export default BookGrid;
