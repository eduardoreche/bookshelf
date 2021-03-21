import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';
import { CopyIcon, DeleteIcon, EditIcon, SettingsIcon } from '@chakra-ui/icons';
import Confirm from './confirm';
import ActionButton from './actionButton';
import { sortObjectArray } from '../utils/sort';

type TableProps = {
  items: any[];
  columns: string[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (item: any) => void;
  onMore?: (item: any) => void;
  orderBy?: string;
};

const ActionTable = ({
  items,
  columns,
  onEdit,
  onDelete,
  onDuplicate,
  orderBy,
  onMore,
}: TableProps) => {
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [confirmName, setConfirmName] = useState('');
  const [confirmId, setConfirmId] = useState('');
  const [sortedItems, setSortedItems] = useState<any[]>([]);

  useEffect(() => {
    const sortField = orderBy || columns[0];

    setSortedItems(sortObjectArray(items, sortField));
  }, [orderBy, items, columns]);

  const confirmDeleteClose = (confirmed: boolean) => {
    if (confirmed) onDelete(confirmId);
    setAskConfirmation(false);
  };

  return (
    <Box pb={20}>
      <Heading as='h4' mb={10}>
        Items {sortedItems.length > 10 ? `(${sortedItems.length})` : ''}
      </Heading>

      <Table variant='striped' colorScheme='gray'>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={`th-${column}`}>{column}</Th>
            ))}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedItems &&
            sortedItems.map((item) => (
              <Tr key={item.id}>
                {columns.map((column) => (
                  <Td key={column}>{item[column]}</Td>
                ))}
                <Td>
                  <Flex justifyItems='flex-end'>
                    <ActionButton
                      label='Edit'
                      colorScheme='yellow'
                      onClick={() => onEdit(item)}
                      icon={<EditIcon />}
                    />

                    <ActionButton
                      label='Delete'
                      colorScheme='red'
                      onClick={() => {
                        setConfirmId(item.id);
                        setConfirmName(item.name);
                        setAskConfirmation(true);
                      }}
                      icon={<DeleteIcon />}
                    />

                    {onDuplicate && (
                      <ActionButton
                        label='Delete'
                        colorScheme='blue'
                        onClick={() => onDuplicate(item)}
                        icon={<CopyIcon />}
                      />
                    )}

                    {onMore && (
                      <ActionButton
                        label='more'
                        colorScheme='green'
                        onClick={() => onMore(item)}
                        icon={<SettingsIcon />}
                      />
                    )}
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <Confirm
        headerMessage={`Delete ${confirmName}`}
        bodyMessage="Are you sure? You can't undo this action afterwards."
        isOpen={askConfirmation}
        onClose={confirmDeleteClose}
      />
    </Box>
  );
};

export default ActionTable;
