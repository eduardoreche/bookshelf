import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Grid,
  GridItem,
  Flex,
  Square,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ActionTable from "../components/actionTable";

import Author from "../models/Author";
import { addAuthor, fetchAuthors } from "../store/actions/authorActions";
import { RootState } from "../store/reducers";

const AuthorForm: React.FC = () => {
  const { authors } = useSelector((state: RootState) => state.authors);

  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (!isInitialized) dispatch(fetchAuthors());

    setIsInitialized(true);
  }, [isInitialized, dispatch, authors]);

  const onSubmit = async (author: Author) => {
    dispatch(addAuthor(author));
  };

  return (
    <Box>
      <Heading>Authors</Heading>
      <Flex>
        <Box flex="3" p={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" ref={register} />
            </FormControl>

            <FormControl id="country">
              <FormLabel>Country</FormLabel>
              <Select name="country" placeholder="Select option" ref={register}>
                <option value="UK">UK</option>
                <option value="US">US</option>
                <option value="BR">BR</option>
              </Select>
            </FormControl>

            <Button mt={10} colorScheme="blue" type="submit">
              Save
            </Button>
          </form>
        </Box>

        <Box flex="9" ml={20}>
          <ActionTable items={authors} columns={["name", "country"]} />
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthorForm;
