import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(state => state.profile);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [error, message, dispatch]);

  return (
    <Container h={'90vh'}>
      <form onSubmit={handleSubmit}>
        <Heading
          children="Forget Password"
          textAlign={['center', 'left']}
          my="16"
        />
        <VStack spacing={8}>
          <Input
            id="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            type="email"
            focusBorderColor="yellow.500"
          />
          <Button
            type="submit"
            colorScheme="yellow"
            w={'full'}
            variant={'solid'}
            isLoading={loading}
          >
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgotPassword;
