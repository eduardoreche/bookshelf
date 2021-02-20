import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Stack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
} from "@chakra-ui/react";

import Author from "../models/Author";
import { BookAuthor } from "../models/Book";
import FormSelect from "./inputs/formSelect";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

type BookAuthorsProps = {
  authors: Author[];
  onChange: (bookAuthors: BookAuthor[]) => void;
};

type FormType = {
  author: string;
  credits: string[];
};

const BookAuthors = ({ authors, onChange }: BookAuthorsProps) => {
  const authorCredits: string[] = ["Story", "Art", "Colors", "Letter", "Cover"];

  const [bookAuthors, setBookAuthors] = useState<BookAuthor[]>([]);

  const { register, getValues, setValue } = useForm<FormType>();

  useEffect(() => {
    onChange(bookAuthors);
  }, [bookAuthors]);

  const onSubmit = () => {
    const data = getValues();
    const author = authors.find((a) => a.id === data.author);
    if (author) {
      const newItem = { author, credits: data.credits };

      setBookAuthors([
        ...bookAuthors.filter((ba) => ba.author.id !== author.id),
        newItem,
      ]);
    }

    setValue("author", undefined);
  };

  const removeAuthor = (bookAuthor: BookAuthor) => {
    setBookAuthors(
      bookAuthors.filter(({ author }) => author.id !== bookAuthor.author.id)
    );
  };

  return (
    <Stack direction='row'>
      <Stack>
        <FormSelect
          label='Authors'
          name='author'
          list={authors}
          reference={register}
        />
        <Stack direction='row' justifyContent='space-between'>
          <Stack spacing={5} direction='row'>
            {authorCredits.map((credit) => (
              <Box key={credit}>
                <Checkbox mt={38} name='credits' value={credit} ref={register}>
                  {credit}
                </Checkbox>
              </Box>
            ))}
          </Stack>

          <Box>
            <IconButton
              ml={50}
              mt={30}
              colorScheme='blue'
              aria-label='New'
              icon={<ArrowForwardIcon />}
              variant='outline'
              onClick={() => {
                onSubmit();
              }}
            />
          </Box>
        </Stack>
      </Stack>
      <Box w='100%'>
        {bookAuthors.length > 0 && (
          <Table variant='striped' colorScheme='gray' m={3}>
            <Thead>
              <Tr>
                <Th>Author</Th>
                <Th>Credits</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {bookAuthors.map((bookAuthor) => (
                <Tr key={bookAuthor.author.id}>
                  <Td>{bookAuthor.author.name}</Td>
                  <Td>
                    {bookAuthor.credits.map((credit) => (
                      <Tag m={1} colorScheme='blue'>
                        {credit}
                      </Tag>
                    ))}
                  </Td>
                  <Td>
                    <IconButton
                      aria-label='Delete'
                      variant='outline'
                      colorScheme='red'
                      onClick={() => removeAuthor(bookAuthor)}
                      icon={<CloseIcon />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Stack>
  );
};

export default BookAuthors;
