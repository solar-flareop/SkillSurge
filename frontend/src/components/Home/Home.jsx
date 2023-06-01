import React from 'react';
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import './home.css';
import { Link } from 'react-router-dom';
import vg from '../../assets/images/landinglogo.jpg';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdacity } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import introVideo from '../../assets/videos/intro.mp4';

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height={'100%'}
          justifyContent={['center', 'space-between']}
          alignItems={'center'}
          spacing={['16', '56']}
        >
          <VStack width={'full'} alignItems={'center'} spacing={8}>
            <Heading
              children="Learn From The Experts"
              size={'2xl'}
              textAlign={'center'}
            />
            <Text
              textAlign={['center', 'left']}
              children="Find Valuable Content At Reasonable Price"
            />
            <Link to="/courses">
              <Button size={'lg'} colorScheme="yellow">
                Explore Now
              </Button>
            </Link>
          </VStack>
          <Image
            src={vg}
            boxSize={'20rem'}
            objectFit={'contain'}
            className="vector-graphics"
          />
        </Stack>
      </div>
      <Box bg={'blackAlpha.800'} padding={'8'}>
        <Heading
          children="OUR BRANDS"
          textAlign={'center'}
          color={'yellow.400'}
          fontFamily={'body'}
        />
        <HStack
          className="brandsBanner"
          marginTop={'4'}
          justifyContent={'space-evenly'}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdacity />
          <DiAws />
        </HStack>
      </Box>
      <div className="container2">
        <video
          autoPlay={true}
          controls
          src={introVideo}
          controlsList="nodownload nofullscreen "
          disablePictureInPicture
        ></video>
      </div>
    </section>
  );
};

export default Home;
