import React, { ReactElement } from 'react';
import { IconButton } from '@chakra-ui/react';

type ActionButtonProps = {
  label: string;
  colorScheme: string;
  onClick: () => void;
  icon: ReactElement;
};

const ActionButton = ({
  label,
  colorScheme,
  onClick,
  icon,
}: ActionButtonProps) => {
  return (
    <IconButton
      aria-label={label}
      variant='outline'
      colorScheme={colorScheme}
      onClick={onClick}
      icon={icon}
      mr={2}
    />
  );
};

export default ActionButton;
