import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ActionTable from "../components/actionTable";

import CountryContext from "../context/Country";
import Author from "../models/Author";
import {
  addAuthor,
  deleteAuthor,
  fetchAuthors,
  updateAuthor,
} from "../store/actions/authorActions";
import { RootState } from "../store/reducers";

const AuthorForm: React.FC = () => {
  const { authors } = useSelector((state: RootState) => state.authors);
  const [author, setAuthor] = useState<Author | undefined>(undefined);
  const countries = useContext(CountryContext);
  const toast = useToast();

  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm<Author>();

  useEffect(() => {
    if (!isInitialized) dispatch(fetchAuthors());
    setIsInitialized(true);
  }, [isInitialized, dispatch, authors]);

  useEffect(() => {
    setValue("id", author?.id);
    setValue("name", author?.name);
    setValue("country", author?.country);
  }, [author, setValue]);

  const onSubmit = (data: Author) => {
    if (data.id) dispatch(updateAuthor(data));
    else dispatch(addAuthor(data));

    setAuthor(undefined);
  };

  const onDelete = (id: string) => {
    dispatch(deleteAuthor(id));
    toast({
      title: "Author deleted.",
      description: "You've deleted an author.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  return (
    <Box>
      <Heading>Authors</Heading>
      <Flex>
        <Box flex='3' p={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type='hidden' name='id' ref={register} />
            <FormControl id='name'>
              <FormLabel>Name</FormLabel>
              <Input type='text' name='name' ref={register} />
            </FormControl>

            <FormControl id='country'>
              <FormLabel>Country</FormLabel>
              <Select name='country' placeholder='Select option' ref={register}>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button mt={10} colorScheme='blue' type='submit'>
              Save
            </Button>
          </form>
        </Box>

        <Box flex='9' ml={20}>
          <ActionTable
            items={authors}
            columns={["name", "country"]}
            onEdit={(author: Author) => setAuthor(author)}
            onDelete={onDelete}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthorForm;
