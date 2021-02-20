import React, { useContext, useEffect, useRef, useState } from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
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
  Select,
  Button,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchBooks,
  updateBook,
  addBook,
  deleteBook,
} from "../store/actions/bookActions";
import Book, { BookAuthor } from "../models/Book";
import { RootState } from "../store/reducers";
import Publisher from "../models/Publisher";
import Author from "../models/Author";
import { fetchAuthors } from "../store/actions/authorActions";
import { fetchPublishers } from "../store/actions/publisherActions";
import TableModel from "../models/TableModel";
import FormSelect from "../components/inputs/formSelect";
import BookAuthors from "../components/bookAuthors";

const BooksScreen = () => {
  const { books } = useSelector((state: RootState) => state.books);
  const { publishers } = useSelector((state: RootState) => state.publishers);
  const { authors } = useSelector((state: RootState) => state.authors);

  const [book, setBook] = useState<Book | undefined>(undefined);
  const [bookAuthors, setBookAuthors] = useState<BookAuthor[]>([]);
  const [bookAuthorType, setBookAuthorType] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");

  const toast = useToast();
  const authorTypes: TableModel[] = [
    { id: "story", name: "Story" },
    { id: "art", name: "Art" },
    { id: "colors", name: "Colors" },
    { id: "letter", name: "Letter" },
  ];

  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, reset } = useForm<Book>();

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchBooks());
      dispatch(fetchAuthors());
      dispatch(fetchPublishers());

      setIsInitialized(true);
    }
  }, [isInitialized, dispatch, books]);

  const onSubmit = async (data: Book) => {
    console.log(data);
    // if (data.id) await dispatch(updateBook(data));
    // else await dispatch(addBook(data));

    // setBook(undefined);
    // reset();
    // showToast("Book saved", "You've succesffuly saved an book");
  };

  const onDelete = async (id: string) => {
    await setBook(undefined);
    dispatch(deleteBook(id));
    showToast("Delete book", "You've succesffuly deleted an book");
  };

  const showToast = (title: string, description: string) =>
    toast({
      title,
      description,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-left",
    });

  const renderAuthors = () => (
    <Box mt={3} mb={3} p={10} bg='#546177' borderRadius='lg'>
      <BookAuthors authors={authors} onChange={(value) => console.log(value)} />
    </Box>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='hidden' name='id' ref={register} />
      <FormControl id='name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input type='text' name='name' ref={register} />
      </FormControl>

      {renderAuthors()}

      <FormSelect name='publisher' list={publishers} reference={register} />

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
        <Input type='number' name='price' ref={register} />
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

      <Button mt={10} colorScheme='blue' type='submit'>
        Save
      </Button>
      <Button ml={5} variant='outline' mt={10} type='reset'>
        Cancel
      </Button>
    </form>
  );

  return (
    <Box>
      <Heading>Books</Heading>

      <Flex justifyContent='space-between'>
        <Text fontSize='2xl' mr={10}>
          {book ? "Edit" : "New"} Book
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
    </Box>
  );
};

export default BooksScreen;
