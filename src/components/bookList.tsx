import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Square,
  Stack,
  Text,
} from '@chakra-ui/react';

import Book from '../models/Book';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

type BookListProp = {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete?: (id: string) => void;
};

const BookList = ({ books, onEdit, onDelete }: BookListProp) => {
  return (
    <Flex>
      {books &&
        books.map((book) => (
          <Box
            w={200}
            minHeight={300}
            bgColor='blue.500'
            key={book.id}
            borderRadius='md'
            m={2}
            p={4}
          >
            <Flex direction='column'>
              <Square size={168} bg='tomato' borderRadius='md'>
                <Text align='center' fontSize='lg' fontWeight='bold'>
                  {book.name}
                </Text>
              </Square>

              <Stack>
                {book.authors?.map((a) => (
                  <Text key={a.author}>{a.author}</Text>
                ))}
              </Stack>
              {onEdit && onDelete && (
                <HStack>
                  <IconButton
                    aria-label='Delete'
                    variant='outline'
                    colorScheme='yellow'
                    onClick={() => onEdit(book)}
                    icon={<EditIcon />}
                  />
                  <IconButton
                    aria-label='Delete'
                    variant='outline'
                    colorScheme='red'
                    onClick={() => (book.id ? onDelete(book.id) : null)}
                    icon={<DeleteIcon />}
                  />
                </HStack>
              )}
            </Flex>
          </Box>
        ))}
    </Flex>
  );
};

export default BookList;
