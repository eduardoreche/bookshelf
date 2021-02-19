import React, { useEffect, useRef, useState } from "react";
import { Box, Checkbox, IconButton, Stack, Text } from "@chakra-ui/react";

import Author from "../models/Author";
import { BookAuthor } from "../models/Book";
import FormSelect from "./inputs/formSelect";
import { AddIcon } from "@chakra-ui/icons";
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

  const { register, reset, getValues, setValue } = useForm<FormType>();

  useEffect(() => {
    onChange(bookAuthors);
  }, [bookAuthors]);

  const onSubmit = () => {
    const data = getValues();
    const author = authors.find((a) => a.id === data.author);
    if (author) {
      setBookAuthors([...bookAuthors, { author, credits: data.credits }]);
    }

    console.log(getValues());
    reset();
  };

  return (
    <>
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
            icon={<AddIcon />}
            variant='outline'
            onClick={() => {
              onSubmit();
            }}
          />
        </Box>
      </Stack>
    </>
  );
};

export default BookAuthors;
