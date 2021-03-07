import { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import LoginForm from '../components/auth/loginForm';
import SignupForm from '../components/auth/signupForm';
import ForgotForm from '../components/auth/forgotForm';

const LogInScreen = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const showSignUpForm = () => setCurrentForm('signup');
  const showLoginForm = () => setCurrentForm('login');
  const showForgot = () => setCurrentForm('forgot');

  return (
    <Flex flex='1 1 0%' alignItems='center' p='32px' direction='column'>
      <Flex
        flex='1 1 0%'
        justifyContent='center'
        alignItems='center'
        width='100%'
        padding='28px 0px 50px'
      >
        <Flex
          borderRadius={10}
          w={480}
          h={480}
          m={10}
          alignItems='center'
          justifyContent='center'
          direction='column'
        >
          <Heading size='lg'>Welcome to</Heading>
          <Heading size='3xl'>Book Shelf</Heading>
        </Flex>
        <Flex
          borderRadius={10}
          w={480}
          h={480}
          backgroundColor='gray.600'
          color='black'
          p={16}
          flexDirection='column'
        >
          {currentForm === 'login' && (
            <LoginForm
              onSignupClick={showSignUpForm}
              onForgotClick={showForgot}
            />
          )}
          {currentForm === 'signup' && (
            <SignupForm onLoginClick={showLoginForm} />
          )}
          {currentForm === 'forgot' && (
            <ForgotForm onLoginClick={showLoginForm} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LogInScreen;
