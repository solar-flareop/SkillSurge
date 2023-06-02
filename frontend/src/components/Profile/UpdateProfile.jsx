import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const UpdateProfile = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  return (
    <Container minH={'90vh'} py={16}>
      <form>
        <Heading
          my={16}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
        >
          Update Profile
        </Heading>
        <VStack spacing={8}>
          <Input
            id="name"
            
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name"
            type="text"
            focusBorderColor="yellow.500"
          />
          <Input
            id="email"
            
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@mail.com"
            type="email"
            focusBorderColor="yellow.500"
          />
          <Button colorScheme="yellow" type="submit" w={'full'}>
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default UpdateProfile