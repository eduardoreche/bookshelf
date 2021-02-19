import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ActionTable from "../components/actionTable";

import Publisher from "../models/Publisher";
import {
  addPublisher,
  fetchPublishers,
} from "../store/actions/publisherActions";
import { RootState } from "../store/reducers";

const PublisherForm: React.FC = () => {
  const { publishers } = useSelector((state: RootState) => state.publishers);

  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (!isInitialized) dispatch(fetchPublishers());

    setIsInitialized(true);
  }, [isInitialized, dispatch, publishers]);

  const onSubmit = async (publisher: Publisher) => {
    dispatch(addPublisher(publisher));
  };

  return (
    <Box>
      <Heading>Publishers</Heading>
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
          <ActionTable items={publishers} columns={["name", "country"]} />
        </Box>
      </Flex>
    </Box>
  );
};

export default PublisherForm;
