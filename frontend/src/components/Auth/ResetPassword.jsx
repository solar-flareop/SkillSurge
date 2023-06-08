import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(state => state.profile);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
    navigate('/login');
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
          children="Reset Password"
          textAlign={['center', 'left']}
          my="16"
        />
        <VStack spacing={8}>
          <Input
            id="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter new password"
            type="password"
            focusBorderColor="yellow.500"
          />
          <Button
            type="submit"
            colorScheme="yellow"
            w={'full'}
            variant={'solid'}
            isLoading={loading}
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
