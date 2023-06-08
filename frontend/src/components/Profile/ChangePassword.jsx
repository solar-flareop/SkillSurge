import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { changePassword } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };

  const { loading, message, error } = useSelector(state => state.profile);

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
    <Container minH={'90vh'} py={16}>
      <form onSubmit={handleSubmit}>
        <Heading
          my={16}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
        >
          Change Password
        </Heading>
        <VStack spacing={8}>
          <Input
            id="oldpassword"
            required
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Enter your old password"
            type="password"
            focusBorderColor="yellow.500"
          />
          <Input
            id="newpassword"
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            type="password"
            focusBorderColor="yellow.500"
          />
          <Button
            colorScheme="yellow"
            type="submit"
            w={'full'}
            isLoading={loading}
          >
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
