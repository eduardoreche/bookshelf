import React from 'react';
import {
  AspectRatio,
  Text,
  Badge,
  Box,
  Center,
  Image,
  Icon,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import Book from '../models/Book';
import { FaBox } from 'react-icons/fa';

type BookTileProps = {
  book: Book;
};

const BookTile = ({ book }: BookTileProps) => {
  return (
    <Box maxW='sm' width={300} borderWidth='1px' overflow='hidden'>
      <AspectRatio maxW='300px' ratio={3 / 5}>
        {book.imageUrls[0] ? (
          <Image src={book.imageUrls[0]} alt={book.name} objectFit='cover' />
        ) : (
          <Box bgColor='gray.400' p={10}>
            <Center>
              <Text align='center'>{book.name}</Text>
            </Center>
          </Box>
        )}
      </AspectRatio>

      <Box p='6'>
        <Box d='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='purple'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          ></Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          color='yellow.400'
        >
          {book.name}
        </Box>
        {book.volume && (
          <Box as='span' color='gray.500' fontSize='sm'>
            Volume {book.volume}
          </Box>
        )}

        <Box mt={2}>
          {book.authors.map((item) => (
            <Box key={item.author}>
              {item.author}
              <Box as='span' color='gray.600' fontSize='sm'>
                / {item.credits.join(' • ')}
              </Box>
            </Box>
          ))}
        </Box>

        {book.storage && (
          <Box mt={2} color='gray.300' fontSize='sm'>
            <Icon as={FaBox} w={4} h={4} mr={2} />
            {book.storage}
          </Box>
        )}

        <Box d='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < (book.stars || 0) ? 'yellow.400' : 'gray.300'}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BookTile;
