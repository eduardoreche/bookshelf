import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Confirm from "./confirm";

type TableProps = {
  items: any[];
  columns: string[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
};

const ActionTable = ({ items, columns, onEdit, onDelete }: TableProps) => {
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [confirmId, setConfirmId] = useState("");

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
              <Th key={column}>{column}</Th>
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
                    <IconButton
                      mr={2}
                      variant='outline'
                      colorScheme='blue'
                      aria-label='Edit'
                      icon={<EditIcon />}
                      onClick={() => onEdit(item)}
                    />

                    <IconButton
                      aria-label='Delete'
                      variant='outline'
                      colorScheme='red'
                      onClick={() => {
                        setConfirmId(item.id);
                        setConfirmName(item.name);
                        setAskConfirmation(true);
                      }}
                      icon={<DeleteIcon />}
                    />
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
