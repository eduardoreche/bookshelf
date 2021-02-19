import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

type ConfirmProps = {
  headerMessage: string;
  bodyMessage: string;
  isOpen: boolean;
  onClose: (confirm: boolean) => void;
};

const Confirm = ({
  headerMessage,
  bodyMessage,
  isOpen,
  onClose,
}: ConfirmProps) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => onClose(false)}
      isCentered
      motionPreset='slideInBottom'
    >
      <AlertDialogOverlay opacity='40'>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {headerMessage}
          </AlertDialogHeader>

          <AlertDialogBody>{bodyMessage}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onClose(false)}>
              Cancel
            </Button>

            <Button colorScheme='red' onClick={() => onClose(true)} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Confirm;
