import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);

  const dispatch = useDispatch();

  const navigate=useNavigate()

  const { loading } = useSelector(state => state.profile);

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate('/profile')
  };

  return (
    <Container minH={'90vh'} py={16}>
      <form onSubmit={handleSubmit}>
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
          <Button
            colorScheme="yellow"
            type="submit"
            w={'full'}
            isLoading={loading}
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
