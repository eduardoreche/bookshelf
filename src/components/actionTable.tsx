import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

type TableProps = {
  items: any[];
  columns: string[];
};

const ModelTable = ({ items, columns }: TableProps) => {
  return (
    <Table variant="striped" colorScheme="blue">
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th>{column}</Th>
          ))}
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items &&
          items.map((item) => (
            <Tr key={item.id}>
              {columns.map((column) => (
                <Td>{item[column]}</Td>
              ))}
              <Td></Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default ModelTable;
