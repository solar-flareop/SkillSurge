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
import { courseRequest } from '../../redux/actions/other';
import toast from 'react-hot-toast';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(state => state.other);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
    setEmail('');
    setCourse('');
    setName('');
  };

  return (
    <Container h={'92vh'} mt={20}>
      <VStack h={'full'} justifyContent={'center'}>
        <Heading children="Request New Course" />
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
            <FormLabel htmlFor="course" children="Course" />
            <Textarea
              id="course"
              required
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain the course..."
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button my={4} colorScheme="yellow" type="submit" isLoading={loading}>
            Submit
          </Button>
          <Box my={4}>
            See available Courses!{' '}
            <Link to="/courses">
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

export default Request;
