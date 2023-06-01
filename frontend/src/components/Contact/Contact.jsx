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
import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <Container h={'92vh'} mt={20}>
      <VStack h={'full'} justifyContent={'center'}>
        <Heading children="Conatct Us" />
        <form style={{ width: '100%' }}>
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
          <Button my={4} colorScheme="yellow" type="submit">
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
