import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react';
import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import Confirm from './confirm';
import ActionButton from './actionButton';

type TableProps = {
  items: any[];
  columns: string[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (item: any) => void;
};

const ActionTable = ({
  items,
  columns,
  onEdit,
  onDelete,
  onDuplicate,
}: TableProps) => {
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [confirmName, setConfirmName] = useState('');
  const [confirmId, setConfirmId] = useState('');

  const confirmDeleteClose = (confirmed: boolean) => {
    if (confirmed) onDelete(confirmId);
    setAskConfirmation(false);
  };

  return (
    <>
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
          {items &&
            items.map((item) => (
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
    </>
  );
};

export default ActionTable;
