import React, { useEffect, useState } from 'react';
import { FormControl, Input, List, ListItem } from '@chakra-ui/react';

import FormLabel from './Label';
import TableModel from '../../models/TableModel';

type AutocompleteProps = {
  name: string;
  value?: string;
  placeholder: string;
  items: TableModel[];
  clear: boolean;
  onChange?: (item: string) => void;
  register?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
};

const Autocomplete = ({
  name,
  value,
  placeholder,
  items,
  onChange,
  clear,
  register,
}: AutocompleteProps) => {
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [displayOptions, setDisplayOptions] = useState(false);

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputValue.length <= 0) setFilteredList([]);
    else
      setFilteredList(
        items
          .filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((item) => item.name)
      );

    if (onChange) onChange(inputValue);
  }, [inputValue, items, onChange]);

  useEffect(() => {
    if (clear) setInputValue('');
  }, [clear]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setDisplayOptions(true);
  };

  const handleSelect = (item: string) => {
    setInputValue(item);
    setDisplayOptions(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (event.type === 'blur') setDisplayOptions(false);
      if (event.type === 'focus') setDisplayOptions(true);
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
        value={inputValue}
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
              _hover={{ bg: 'gray.100', color: 'black' }}
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
