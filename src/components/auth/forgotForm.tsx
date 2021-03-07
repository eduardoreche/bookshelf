import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  Heading,
  Input,
  Alert,
  Link,
  AlertIcon,
  Center,
  InputGroup,
  InputLeftElement,
  Spacer,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArrowBackIcon, EmailIcon } from '@chakra-ui/icons';
import { useAuth } from '../../context/AuthContext';

interface IFormInputs {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

type Props = {
  onLoginClick: () => void;
};

const ForgotForm = ({ onLoginClick }: Props) => {
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
    setMessage('');

    await resetPassword(email);

    setMessage('Check your inbox for further instructions');

    setLoading(false);
  };
  return (
    <>
      <Center>
        <Heading size='lg' color='gray.400'>
          Reset my password
        </Heading>
      </Center>

      {message && (
        <Alert status='info'>
          <AlertIcon />
          {message}
        </Alert>
      )}

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

        <Button
          mt={5}
          colorScheme='yellow'
          type='submit'
          disabled={loading}
          w='100%'
          size='lg'
        >
          Reset
        </Button>
      </form>

      <Spacer />

      <Link mt={10} mb={10} onClick={onLoginClick} color='yellow'>
        <ArrowBackIcon /> Back to login page
      </Link>
    </>
  );
};

export default ForgotForm;
