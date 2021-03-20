import React, { useEffect, useState } from 'react';
import { AddIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Flex,
  IconButton,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { fetchBooks, updateBook, addBook } from '../store/actions/bookActions';
import Book, { BookAuthor } from '../models/Book';
import { RootState } from '../store/reducers';
import {
  fetchAuthors,
  findOrCreate as authorsFindOrCreate,
} from '../store/actions/authorActions';
import {
  fetchPublishers,
  findOrCreate as publishersFindOrCreate,
} from '../store/actions/publisherActions';
import BookAuthors from '../components/bookAuthors';
import Autocomplete from '../components/inputs/Autocomplete';
import { RouteComponentProps } from '@reach/router';
import PageLayout from '../components/pageLayout';
import ActionTable from '../components/actionTable';

const BooksScreen = ({ path, uri }: RouteComponentProps) => {
  const { books } = useSelector((state: RootState) => state.books);
  const { publishers } = useSelector((state: RootState) => state.publishers);

  const [book, setBook] = useState<Book | undefined>(undefined);
  const [shouldClear, setShouldClear] = useState(false);
  const [bookAuthors, setBookAuthors] = useState<BookAuthor[]>([]);

  const toast = useToast();

  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  const { register, setValue, handleSubmit, reset } = useForm<Book>();

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchBooks());
      dispatch(fetchAuthors());
      dispatch(fetchPublishers());

      setIsInitialized(true);
    }
  }, [isInitialized, dispatch, books]);

  const onSubmit = async (data: Book) => {
    bookAuthors.map((a) => dispatch(authorsFindOrCreate(a.author)));
    dispatch(publishersFindOrCreate(data.publisher));
    const newBook = {
      ...data,
      authors: bookAuthors,
    };

    if (data.id) await dispatch(updateBook(newBook));
    else await dispatch(addBook(newBook));

    dispatch(fetchBooks());

    setBook(undefined);
    reset();
    setShouldClear(true);
    showToast('Book saved', "You've succesffuly saved an book");
  };

  const onReset = () => {
    setBookAuthors([]);
    setShouldClear(true);
  };

  const onDelete = async (id: string) => {
    await setBook(undefined);
    dispatch(deleteBoook(id));
    showToast('Delete book', "You've succesffuly deleted a book");
  };

  const onDuplicate = (aBook: Book) => {
    const fields: Array<Array<string>> = Object.entries(aBook).filter(
      (entry) => entry[0] !== 'id'
    );

    fields.forEach((entry) => setValue(entry[0], entry[1]));
    setBookAuthors(aBook.authors);

    setBook({ ...aBook, id: undefined });
  };

  const showToast = (title: string, description: string) =>
    toast({
      title,
      description,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='hidden' name='id' ref={register} />
      <FormControl id='name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input type='text' name='name' ref={register} />
      </FormControl>

      <Box mt={3} mb={3} p={10} bg='#546177' borderRadius='lg'>
        <BookAuthors
          authors={book?.authors}
          onChange={(value) => {
            setBookAuthors(value);
          }}
          shouldClear={shouldClear}
        />
      </Box>

      <Autocomplete
        name='publisher'
        value={book?.publisher}
        items={publishers}
        placeholder="Type publisher's name"
        register={register}
        clear={shouldClear}
      />

      <FormControl id='language'>
        <FormLabel>Language</FormLabel>
        <Input type='text' name='language' ref={register} />
      </FormControl>

      <FormControl id='printing'>
        <FormLabel>Printing</FormLabel>
        <Input type='number' name='printing' ref={register} />
      </FormControl>

      <FormControl id='price'>
        <FormLabel>Price</FormLabel>
        <Input type='number' name='price' step='.01' ref={register} />
      </FormControl>

      <FormControl id='stars'>
        <FormLabel>Stars</FormLabel>
        <Input type='number' name='stars' ref={register} />
      </FormControl>

      <FormControl id='volume'>
        <FormLabel>Volume</FormLabel>
        <Input type='number' name='volume' ref={register} />
      </FormControl>

      <FormControl id='imprint'>
        <FormLabel>Imprint</FormLabel>
        <Input type='number' name='imprint' ref={register} />
      </FormControl>

      <FormControl id='cover'>
        <FormLabel>Cover</FormLabel>
        <Input type='file' multiple name='cover' ref={register} />
      </FormControl>

      <Button mt={10} colorScheme='blue' type='submit'>
        Save
      </Button>
      <Button
        ml={5}
        variant='outline'
        mt={10}
        type='reset'
        onClick={() => onReset()}
      >
        Cancel
      </Button>
    </form>
  );

  return (
    <PageLayout>
      <Heading>Books</Heading>

      <Flex justifyContent='space-between'>
        <Text fontSize='2xl' mr={10}>
          {book?.id ? 'Edit' : 'New'} Book
        </Text>

        <IconButton
          colorScheme='blue'
          aria-label='New'
          icon={<AddIcon />}
          onClick={() => setBook(undefined)}
        />
      </Flex>

      <Flex>
        <Box flex='3' mt={10}>
          <Box p={4} bg='#2D3748' borderRadius='lg'>
            {isInitialized && renderForm()}
          </Box>
        </Box>
      </Flex>

      <Box pt={10}>
        <Heading>Book list</Heading>
        <ActionTable
          items={books}
          columns={['name', 'valume', 'language']}
          onEdit={(book: Book) => setBook(book)}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      </Box>
    </PageLayout>
  );
};

export default BooksScreen;
function deleteBoook(id: string): any {
  throw new Error('Function not implemented.');
}
