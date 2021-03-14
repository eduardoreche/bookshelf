import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Heading,
  Flex,
  useToast,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import ActionTable from '../components/actionTable';

import { CountryContext } from '../context/CountryContext';
import Publisher from '../models/Publisher';
import {
  addPublisher,
  deletePublisher,
  fetchPublishers,
  updatePublisher,
} from '../store/actions/publisherActions';
import { RootState } from '../store/reducers';
import { useContext } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import Header from '../components/header';
import PageLayout from '../components/pageLayout';

const PublisherForm: React.FC = () => {
  const { publishers } = useSelector((state: RootState) => state.publishers);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const countries = useContext(CountryContext);
  const toast = useToast();

  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (!isInitialized) dispatch(fetchPublishers());

    setIsInitialized(true);
  }, [isInitialized, dispatch, publishers]);

  useEffect(() => {
    setValue('id', publisher ? publisher.id : undefined);
    setValue('name', publisher ? publisher.name : undefined);
    setValue('country', publisher ? publisher.country : undefined);
  }, [publisher, setValue]);

  const onSubmit = async (data: Publisher) => {
    if (data.id) dispatch(updatePublisher(data));
    else dispatch(addPublisher(data));

    setPublisher(undefined);
    reset();

    showToast('Publisher saved', "You've succesffuly saved a publisher");
  };

  const onDelete = (id: string) => {
    setPublisher(undefined);
    dispatch(deletePublisher(id));

    showToast('Publisher deleted', "You've succesffuly deleted a publisher");
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
      <Heading>Publishers</Heading>

      <Flex justifyContent='space-between'>
        <Text fontSize='2xl' mr={10}>
          {publisher ? 'Edit' : 'New'} Publisher
        </Text>

        <IconButton
          colorScheme='blue'
          aria-label='New'
          icon={<AddIcon />}
          onClick={() => setPublisher(undefined)}
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
            items={publishers}
            columns={['name', 'country']}
            onEdit={(publisher: Publisher) => setPublisher(publisher)}
            onDelete={onDelete}
          />
        </Box>
      </Flex>
    </PageLayout>
  );
};

export default PublisherForm;
