import React from "react";
import { Box, Flex, Square, Stack, Text } from "@chakra-ui/react";

import Book from "../models/Book";

type BookListProp = {
  books: Book[];
};

const BookList = ({ books }: BookListProp) => (
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
                <Text key={a.author.id}>{a.author.name}</Text>
              ))}
            </Stack>
          </Flex>
        </Box>
      ))}
  </Flex>
);

export default BookList;
