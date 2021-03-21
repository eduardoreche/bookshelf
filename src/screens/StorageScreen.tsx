import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Heading,
  useToast,
  IconButton,
  Text,
  useDisclosure,
  ModalFooter,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import ActionTable from '../components/actionTable';

import Storage from '../models/Storage';
import {
  addStorage,
  deleteStorage,
  fetchStorages,
  updateStorage,
} from '../store/actions/storageActions';
import { RootState } from '../store/reducers';
import { AddIcon } from '@chakra-ui/icons';
import PageLayout from '../components/pageLayout';
import StorageMoves from '../components/storageMoves';

const StorageForm: React.FC = () => {
  const { storages } = useSelector((state: RootState) => state.storages);
  const [storage, setStorage] = useState<Storage | undefined>(undefined);
  const toast = useToast();

  const [storageToAdd, setStorageToAdd] = useState<Storage | undefined>(
    undefined
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, reset } = useForm<Storage>();

  useEffect(() => {
    if (!isInitialized) dispatch(fetchStorages());
    setIsInitialized(true);
  }, [isInitialized, dispatch, storages]);

  useEffect(() => {
    setValue('id', storage?.id);
    setValue('name', storage?.name);
  }, [storage, setValue]);

  const onSubmit = async (data: Storage) => {
    if (data.id) await dispatch(updateStorage(data));
    else await dispatch(addStorage(data));

    setStorage(undefined);
    reset();
    showToast('Storage saved', "You've succesffuly saved an storage");
  };

  const onDelete = async (id: string) => {
    await setStorage(undefined);
    dispatch(deleteStorage(id));
    showToast('Delete storage', "You've succesffuly deleted an storage");
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

  const onAddBooks = (storage: Storage) => {
    setStorageToAdd(storage);
    onOpen();
  };

  return (
    <PageLayout>
      <Heading>Storages</Heading>

      <Flex justifyContent='space-between'>
        <Text fontSize='2xl' mr={10}>
          {storage ? 'Edit' : 'New'} Storage
        </Text>

        <IconButton
          colorScheme='blue'
          aria-label='New'
          icon={<AddIcon />}
          onClick={() => setStorage(undefined)}
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
            items={storages}
            columns={['name']}
            onEdit={(storage: Storage) => setStorage(storage)}
            onDelete={onDelete}
            onMore={onAddBooks}
          />
        </Box>
      </Flex>

      {storageToAdd && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset='slideInBottom'
          size='full'
          scrollBehavior='inside'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Books to {storageToAdd?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <StorageMoves storage={storageToAdd} />
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </PageLayout>
  );
};

export default StorageForm;
