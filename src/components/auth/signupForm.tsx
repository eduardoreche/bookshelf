import { useState, useEffect } from 'react';
import {
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spacer,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from '@reach/router';
import { useAuth } from '../../context/AuthContext';
import { ArrowBackIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';

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
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

type Props = {
  onLoginClick: () => void;
};

const SignupForm = ({ onLoginClick }: Props) => {
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
    navigate('/');
    setLoading(false);
  };

  return (
    <>
      <Center>
        <Heading size='lg' color='gray.400'>
          Sign up
        </Heading>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          id='email'
          isInvalid={!!errors.email}
          required
          pt={10}
          pb={3}
        >
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

        <FormControl
          id='password'
          isInvalid={!!errors.password}
          required
          pb={3}
        >
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

        <FormControl
          id='passwordConfirm'
          isInvalid={!!errors.passwordConfirm}
          required
        >
          <InputGroup size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<LockIcon color='gray.300' />}
            />
            <Input
              type='password'
              placeholder='Confirmation'
              name='passwordConfirm'
              ref={register}
              backgroundColor='gray.800'
              color='gray.300'
            />
          </InputGroup>
        </FormControl>

        <Button
          mt={5}
          colorScheme='yellow'
          type='submit'
          disabled={loading}
          w='100%'
          size='lg'
        >
          Sign up
        </Button>
      </form>
      <Spacer />
      <Link mt={10} mb={10} onClick={onLoginClick} color='yellow'>
        <ArrowBackIcon /> Back to login page
      </Link>
    </>
  );
};

export default SignupForm;
