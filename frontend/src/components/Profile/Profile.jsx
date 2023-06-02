import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import vg from '../../assets/images/landinglogo.jpg';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../Auth/Register';

const Profile = () => {
  const user = {
    name: 'Suraj',
    email: 'SUraj@mail.com',
    createdAt: String(new Date().toISOString()),
    role: 'user',
    subscription: {
      status: 'active',
    },
    playlist: [
      {
        course: 'qsd',
        poster: vg,
      },
    ],
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  const removeFromPlaylistHandler = id => {};

  const changeImageSubmitHandler=(e,image)=>{
e.preventDefault()
  }

  return (
    <Container minH={'95vh'} maxW={'container.lg'} py={6}>
      <Heading m={8} textTransform={'uppercase'} children="Profile" />

      <Stack
        justifyContent={'flex-start'}
        padding={4}
        spacing={['8', '16']}
        alignItems={'center'}
        direction={['column', 'row']}
      >
        <VStack>
          <Avatar boxSize={20} />
          <Button
            colorScheme="yellow"
            variant={'ghost'}
            children="Change Photo"
            onClick={onOpen}
          />
        </VStack>
        <VStack spacing={4} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children="Name" fontWeight={'bold'} />
            <Text children={user.name} />
          </HStack>
          <HStack>
            <Text children="Email" fontWeight={'bold'} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children="CreatedAt" fontWeight={'bold'} />
            <Text children={user.createdAt.split('T')[0]} />
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription.status === 'active' ? (
                <Button color="yellow.500">Cancel Subscription</Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme="yellow">Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack alignItems={'center'} direction={['column', 'row']}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>
            <Link to="/changepassword">
              <Button>Update Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading children="Playlist" size={'md'} my={8} />
      {user.playlist.length > 0 && (
        <Stack
          alignItems={'center'}
          direction={['column', 'row']}
          flexWrap={'wrap'}
          p={4}
        >
          {user.playlist.map((element, index) => (
            <VStack w={48} key={element.course} m={2}>
              <Image
                src={element.poster}
                objectFit={'contain'}
                boxSize={'full'}
              />
              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>
                <Button
                  onClick={() => removeFromPlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}

      <ChangePhotoBox isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler} />
    </Container>
  );
};

export default Profile;




const ChangePhotoBox = ({ isOpen, onClose, changeImageSubmitHandler }) => {
    const [imagePrev, setImagePrev] = useState('');
    const [image, setImage] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const onCloseHandler=()=>{
    onClose();
    setImage('')
    setImagePrev('')
  }
  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>
            Change Photo
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={(e)=>changeImageSubmitHandler(e,image)}>
              <VStack spacing={8}>
                {imagePrev && <Avatar boxSize={32} src={imagePrev}/>}
                <Input
                  type="file"
                  onChange={changeImage}
                  css={{ '&::file-selector-button': fileUploadCss }}
                />
                <Button colorScheme="yellow" w={'full'} type="submit">
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onCloseHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};