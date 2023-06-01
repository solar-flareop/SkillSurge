import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <Container h={'90vh'}>
      <form>
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
          >
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgotPassword;
