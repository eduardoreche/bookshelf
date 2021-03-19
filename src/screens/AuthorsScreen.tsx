import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import ActionTable from '../components/actionTable';

import { CountryContext } from '../context/CountryContext';
import Author from '../models/Author';
import {
  addAuthor,
  deleteAuthor,
  fetchAuthors,
  updateAuthor,
} from '../store/actions/authorActions';
import { RootState } from '../store/reducers';
import { AddIcon } from '@chakra-ui/icons';
import PageLayout from '../components/pageLayout';

const AuthorForm: React.FC = () => {
  const { authors } = useSelector((state: RootState) => state.authors);
  const [author, setAuthor] = useState<Author | undefined>(undefined);
  const countries = useContext(CountryContext);
  const toast = useToast();

  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, reset } = useForm<Author>();

  useEffect(() => {
    if (!isInitialized) dispatch(fetchAuthors());
    setIsInitialized(true);
  }, [isInitialized, dispatch, authors]);

  useEffect(() => {
    setValue('id', author?.id);
    setValue('name', author?.name);
    setValue('country', author?.country);
  }, [author, setValue]);

  const onSubmit = async (data: Author) => {
    if (data.id) await dispatch(updateAuthor(data));
    else await dispatch(addAuthor(data));

    setAuthor(undefined);
    reset();
    showToast('Author saved', "You've succesffuly saved an author");
  };

  const onDelete = async (id: string) => {
    await setAuthor(undefined);
    dispatch(deleteAuthor(id));
    showToast('Delete author', "You've succesffuly deleted an author");
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

  return (
    <PageLayout>
      <Heading>Authors</Heading>

      <Flex justifyContent='space-between'>
        <Text fontSize='2xl' mr={10}>
          {author ? 'Edit' : 'New'} Author
        </Text>

        <IconButton
          colorScheme='blue'
          aria-label='New'
          icon={<AddIcon />}
          onClick={() => setAuthor(undefined)}
        />
      </Flex>

      <Flex>
        <Box flex='3'>
          <Box p={4} bg='#2D3748' borderRadius='lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type='hidden' name='id' ref={register} />
              <FormControl id='name'>
                <FormLabel>Name</FormLabel>
                <Input type='text' name='name' ref={register} />
              </FormControl>

              <FormControl id='country'>
                <FormLabel>Country</FormLabel>
                <Select
                  name='country'
                  placeholder='Select option'
                  ref={register}
                >
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
              <Button ml={5} variant='outline' mt={10} type='reset'>
                Cancel
              </Button>
            </form>
          </Box>
        </Box>

        <Box flex='9' ml={20}>
          <ActionTable
            items={authors}
            columns={['name', 'country']}
            onEdit={(author: Author) => setAuthor(author)}
            onDelete={onDelete}
          />
        </Box>
      </Flex>
    </PageLayout>
  );
};

export default AuthorForm;
