import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container minH={'95vh'} mt={20}>
      <VStack h={'full'} justifyContent={'center'} spacing={16}>
        <Heading children={'Welcome to Online Adda'} />
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my={4}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              id="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              id="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant={'link'}>
                Forget Password?
              </Button>
            </Link>
          </Box>
          <Button my={4} colorScheme="yellow" type="submit">
            Login
          </Button>
          <Box my={4}>
            New User ?{' '}
            <Link to="/register">
              <Button colorScheme="yellow" variant={'link'}>
                Sign Up
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
