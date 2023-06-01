import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ecc94b',
  backgroundColor: 'white',
};

const  fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeProfileImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  return (
    <Container minH={'95vh'} mt={10}>
      <VStack h={'full'} justifyContent={'center'} >
        <Heading children={'Registration'} />
        <form style={{ width: '100%' }}>
          <Box my={4} textAlign={'center'}>
            <Avatar size={'xl'} src={imagePrev} />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="name" children="Name " />
            <Input
              id="name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Smith"
              type="name"
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
              placeholder="john@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              id="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              id="chooseAvatar"
              required
              type="file"
              accept="image/*"
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={changeProfileImageHandler}
            />
          </Box>

          <Button my={4} colorScheme="yellow" type="submit">
            Sign Up
          </Button>
          <Box my={4}>
            Already Signed Up ?{' '}
            <Link to="/login">
              <Button colorScheme="yellow" variant={'link'}>
                Login
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Register;
