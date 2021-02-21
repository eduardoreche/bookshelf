import React from "react";
import { FormControl, Select } from "@chakra-ui/react";

import Label from "./Label";

type FormSelectProps = {
  name: string;
  list: any[];
  reference?: any;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const FormSelect = ({ name, list, reference, onChange }: FormSelectProps) => {
  return (
    <FormControl id={name}>
      <Label name={name} />
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
