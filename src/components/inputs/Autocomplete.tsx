import React, { useEffect, useRef, useState } from "react";
import { FormControl, Input, List, ListItem } from "@chakra-ui/react";

import FormLabel from "./Label";
import TableModel from "../../models/TableModel";

type AutocompleteProps = {
  name: string;
  placeholder: string;
  items: TableModel[];
  onChange: (item: string) => void;
  register?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
};

const Autocomplete = ({
  name,
  placeholder,
  items,
  onChange,
  register,
}: AutocompleteProps) => {
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [displayOptions, setDisplayOptions] = useState(false);

  useEffect(() => {
    if (value.length <= 0) setFilteredList([]);
    else
      setFilteredList(
        items
          .filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => item.name)
      );

    onChange(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setDisplayOptions(true);
  };

  const handleSelect = (item: string) => {
    setValue(item);
    setDisplayOptions(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (event.type === "blur") setDisplayOptions(false);
      if (event.type === "focus") setDisplayOptions(true);
    }, 300);
  };

  return (
    <FormControl>
      <FormLabel name={name} />
      <Input
        zIndex={11}
        type='text'
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete='off'
        value={value}
        onFocus={handleFocus}
        onBlur={handleFocus}
        ref={register}
      />
      {displayOptions && filteredList.length > 0 && (
        <List
          position='absolute'
          p={4}
          zIndex={10}
          bg='blue.500'
          w='100%'
          borderEndStartRadius='md'
          borderEndEndRadius='md'
        >
          {filteredList.map((item) => (
            <ListItem
              key={item}
              onClick={(_) => handleSelect(item)}
              _hover={{ bg: "gray.100", color: "black" }}
              cursor='pointer'
            >
              {item}
            </ListItem>
          ))}
        </List>
      )}
    </FormControl>
  );
};

export default Autocomplete;
