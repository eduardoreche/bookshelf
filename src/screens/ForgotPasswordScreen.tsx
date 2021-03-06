import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Alert,
  Link,
  AlertIcon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link as ReachLink } from "@reach/router";

import { useAuth } from "../context/AuthContext";

interface IFormInputs {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPasswordScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>();
  const { resetPassword } = useAuth();

  const { register, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (errors) console.log(errors);
  }, [errors]);

  const onSubmit = async ({ email }: IFormInputs) => {
    setLoading(true);
    setMessage("");

    await resetPassword(email);

    setMessage("Check your inbox for further instructions");

    setLoading(false);
  };

  return (
    <Box w={600}>
      <Heading as='h4' size='4xl'>
        Reset password
      </Heading>

      {message && (
        <Alert status='info'>
          <AlertIcon />
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id='email' isInvalid={!!errors.email} required>
          <FormLabel>Email</FormLabel>
          <Input type='text' name='email' ref={register} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={10} colorScheme='blue' type='submit' disabled={loading}>
          Reset Password
        </Button>
      </form>

      <Box mt={10}>
        <Link as={ReachLink} to='/login'>
          {"<"} Back to Login page.
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPasswordScreen;
