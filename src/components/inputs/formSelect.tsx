import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

import TableModel from "../../models/TableModel";

type FormSelectProps = {
  name: string;
  list: any[];
  label?: string;
  reference?: any;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const FormSelect = ({
  name,
  label,
  list,
  reference,
  onChange,
}: FormSelectProps) => {
  const getLabel = () => {
    if (label) return label;

    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <FormControl id={name}>
      <FormLabel>{getLabel()}</FormLabel>
      <Select
        name={name}
        placeholder='Select option'
        ref={reference}
        onChange={onChange}
      >
        {list.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
