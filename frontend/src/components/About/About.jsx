import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndConditions from '../../assets/docs/termsAndCondition.js'

const Founder = () => {
  return (
    <Stack direction={['column', 'row']} spacing={[4, 16]} padding={8}>
      <VStack>
        <Avatar
          boxSize={['30', '40']}
          src="https://avatars.githubusercontent.com/u/95372326?v=4"
        />
        <Text children="Co-Founder" opacity={0.7} />
      </VStack>
      <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
        <Heading children="Suraj Pattade" size={['md', 'xl']} />
        <Text
          children={
            'Hi, I am a full-stack web and mobile developer.Our mission is to provide qualiity content at reasonable price'
          }
          textAlign={['center', 'left']}
        />
      </VStack>
    </Stack>
  );
};

const VideoPlayer = () => {
  return (
    <Box>
      <video
        autoPlay={true}
        controls
        muted
        loop
        src={introVideo}
        controlsList="nodownload nofullscreen "
        disablePictureInPicture
      ></video>
    </Box>
  );
};

const TandC = ({ termsAndConditions }) => (
  <Box>
    <Heading
      children="Terms & Conditions"
      size={'md'}
      bg={'pink'}
      my={4}
      textAlign={['center', 'left']}
    />
    <Box p={4} h={'sm'} overflowY={'scroll'}>
      <Text
        textAlign={['center', 'left']}
        fontFamily={'heading'}
        letterSpacing={'widest'}
      >
        {termsAndConditions}
      </Text>
      <Heading
        children="Refund only applicable for cancellation within 7 days"
        size={'xs'}
        my={4}
      />
    </Box>
  </Box>
);

const About = () => {
  return (
    <Container maxW={'container.lg'} padding={16} boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />

      <Founder />

      <Stack m={8} direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} m={8} textAlign={['center', 'left']}>
          We are a video streaming platform with some premium courses available
          only for premium users.
        </Text>
        <Link to="/subscribe">
          <Button varient="ghost" colorScheme="yellow">
            Checkout Our Plans
          </Button>
        </Link>
      </Stack>

      <VideoPlayer />

      <TandC termsAndConditions={termsAndConditions} />

      <HStack p={4} my={4}>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontSize={'sans-serif'}
          textTransform={'uppercase'}
          children="Payment is secured by Razorpay"
        />
      </HStack>
    </Container>
  );
};

export default About;
