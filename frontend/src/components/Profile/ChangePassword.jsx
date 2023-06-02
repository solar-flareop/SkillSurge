import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  return (
    <Container minH={'90vh'} py={16}>
      <form>
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
          <Button colorScheme="yellow" type="submit" w={'full'}>
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
