import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import Storage from '../models/Storage';
import Book from '../models/Book';
import { RootState } from '../store/reducers';
import ActionButton from './actionButton';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { updateBook } from '../store/actions/bookActions';
import { debounce } from '../utils/debounce';

type StorageMovesProp = {
  storage: Storage;
};

const StorageMoves = ({ storage }: StorageMovesProp) => {
  const { books } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();

  const [onStorage, setOnStorage] = useState<Book[]>([]);
  const [otherStorage, setOtherStorage] = useState<Book[]>([]);

  useEffect(() => {
    setOnStorage(books.filter((book) => book.storage === storage.name));
    setOtherStorage(books.filter((book) => book.storage !== storage.name));
  }, [books, storage]);

  const addToStorage = (book: Book) => {
    book.storage = storage.name;

    dispatch(updateBook(book));
  };

  const removeFromStorage = (book: Book) => {
    book.storage = undefined;

    dispatch(updateBook(book));
  };

  return (
    <SimpleGrid columns={2} spacing={2}>
      <Box p={5}>
        <Heading pb={10}>
          Books on other storages ({otherStorage.length})
        </Heading>

        <Table variant='striped' colorScheme='blue'>
          <Thead>
            <Tr>
              <Th>Book</Th>
              <Th>Volume</Th>
              <Th>Current Storage</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {otherStorage &&
              otherStorage.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.volume}</Td>
                  <Td>{item.storage}</Td>
                  <Td>
                    <ActionButton
                      label='Move right'
                      colorScheme='white'
                      icon={<ArrowForwardIcon />}
                      onClick={() => addToStorage(item)}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      <Box p={5}>
        <Heading pb={10}>
          Books on {storage.name} ({onStorage.length})
        </Heading>
        <Table variant='striped' colorScheme='cyan'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Book</Th>
              <Td>Volume</Td>
              <Th>Current Storage</Th>
            </Tr>
          </Thead>
          <Tbody>
            {onStorage &&
              onStorage.map((item) => (
                <Tr key={item.id}>
                  <Td>
                    <ActionButton
                      label='Move left'
                      colorScheme='white'
                      icon={<ArrowBackIcon />}
                      onClick={() => removeFromStorage(item)}
                    />
                  </Td>
                  <Td>{item.name}</Td>
                  <Td>{item.volume}</Td>
                  <Td>{item.storage}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </SimpleGrid>
  );
};

export default StorageMoves;
