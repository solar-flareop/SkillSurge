import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const params = useParams();

  return (
    <Container h={'90vh'}>
      <form>
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
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
