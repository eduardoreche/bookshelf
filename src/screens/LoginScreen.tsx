import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link as ReachLink, useNavigate } from "@reach/router";

import { useAuth } from "../context/AuthContext";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const LogInScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }: IFormInputs) => {
    setLoading(true);

    await login(email, password);
    navigate("/");

    setLoading(false);
  };

  return (
    <Box w={400}>
      <Heading as='h4' size='4xl'>
        Log In
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id='email' isInvalid={!!errors.email} required>
          <FormLabel>Email</FormLabel>
          <Input type='text' name='email' ref={register} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl id='password' isInvalid={!!errors.password} required>
          <FormLabel>Password</FormLabel>
          <Input type='password' name='password' ref={register} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={10} colorScheme='blue' type='submit' disabled={loading}>
          Log In
        </Button>
      </form>

      <Box>
        Forgot your password? &nbsp;
        <Link as={ReachLink} to='/forgot'>
          Click here!
        </Link>
      </Box>

      <Box>
        Doesn't have an account? &nbsp;
        <Link as={ReachLink} to='/signup'>
          Sign Up!
        </Link>
      </Box>
    </Box>
  );
};

export default LogInScreen;
