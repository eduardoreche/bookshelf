import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link as ReachLink, useNavigate } from "@reach/router";

import { useAuth } from "../context/AuthContext";

interface IFormInputs {
  email: string;
  password: string;
  passwordConfirm: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const SignUpScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (errors) console.log(errors);
  }, [errors]);

  const onSubmit = async ({ email, password }: IFormInputs) => {
    setLoading(true);

    await signup(email, password);
    navigate("/");
    setLoading(false);
  };

  return (
    <Box w={400}>
      <Heading as='h4' size='4xl'>
        Sign Up
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

        <FormControl
          id='passwordConfirm'
          isInvalid={!!errors.passwordConfirm}
          required
        >
          <FormLabel>Password Confirmation</FormLabel>
          <Input type='password' name='passwordConfirm' ref={register} />
          <FormErrorMessage>{errors.passwordConfirm?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={10} colorScheme='blue' type='submit' disabled={loading}>
          Sign Up
        </Button>
      </form>

      <Box>
        Already have an account? &nbsp;
        <Link as={ReachLink} to='/login'>
          Log In!
        </Link>
      </Box>
    </Box>
  );
};

export default SignUpScreen;
