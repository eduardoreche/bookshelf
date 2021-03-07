import { useState } from 'react';
import {
  Flex,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  Link,
  Button,
  Center,
  Divider,
  Icon,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from '@reach/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { FaGoogle } from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

type Props = {
  onSignupClick: () => void;
  onForgotClick: () => void;
};

const LoginForm = ({ onSignupClick, onForgotClick }: Props) => {
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }: IFormInputs) => {
    setLoading(true);

    await login(email, password);
    navigate('/');

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <FormControl id='email' isInvalid={!!errors.email} required pb={3}>
          <InputGroup size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<EmailIcon color='gray.300' />}
            />
            <Input
              type='email'
              placeholder='E-mail'
              name='email'
              ref={register}
              backgroundColor='gray.800'
              color='gray.300'
            />
          </InputGroup>
        </FormControl>
        <FormControl id='password' isInvalid={!!errors.password} required>
          <InputGroup size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<LockIcon color='gray.300' />}
            />
            <Input
              type='password'
              placeholder='Password'
              name='password'
              ref={register}
              backgroundColor='gray.800'
              color='gray.300'
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          &nbsp;
          <Link onClick={() => onForgotClick()} color='yellow'>
            I forgot my password.
          </Link>
        </FormControl>
        <Button
          mt={5}
          colorScheme='yellow'
          type='submit'
          disabled={loading}
          w='100%'
          size='lg'
        >
          Log In
        </Button>
      </form>

      <Center mt={10} mb={10} color='grey.800'>
        Doesn't have an account? &nbsp;
        <Link onClick={() => onSignupClick()} color='yellow'>
          Sign Up!
        </Link>
      </Center>

      <Divider />

      <Flex mt={10} alignItems='center' justifyContent='center'>
        <Text mr={10}>Or</Text>
        <Button
          leftIcon={<Icon as={FaGoogle} mb='2px' color='yellow' />}
          variant='solid'
          size='lg'
          onClick={() => signInWithGoogle()}
        >
          Sign in with Google
        </Button>
      </Flex>
    </>
  );
};

export default LoginForm;
