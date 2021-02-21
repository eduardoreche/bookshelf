import React from "react";
import { FormLabel } from "@chakra-ui/react";

type LabelProps = {
  name: string;
};

const Label = ({ name }: LabelProps) => (
  <FormLabel>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
);

export default Label;
