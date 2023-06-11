import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactRequest } from '../../redux/actions/other';
import toast from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const {
    loading,
    error,
    message: stateMessage,
  } = useSelector(state => state.other);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(contactRequest(name, email, message));
    setEmail('')
    setMessage('')
    setName('')
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (stateMessage) {
      toast.success(stateMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, stateMessage]);

  return (
    <Container h={'92vh'} mt={20}>
      <VStack h={'full'} justifyContent={'center'}>
        <Heading children="Contact Us" />
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my={4}>
            <FormLabel htmlFor="name" children="Enter Your Name" />
            <Input
              id="name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John"
              type="text"
              focusBorderColor="yellow.500"
            />
          </Box>
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
            <FormLabel htmlFor="message" children="Enter your message" />
            <Textarea
              id="message"
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Message..."
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button my={4} colorScheme="yellow" type="submit" isLoading={loading}>
            Send Email
          </Button>
          <Box my={4}>
            Request a new course?{' '}
            <Link to="/request">
              <Button colorScheme="yellow" variant={'link'}>
                Click
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contact;
