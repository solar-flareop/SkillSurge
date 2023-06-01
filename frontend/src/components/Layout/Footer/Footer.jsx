import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';

const Footer = () => {
  return (
    <Box padding={4} bg={'blackAlpha.900'} minHeight={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width={'full'}>
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading
            children="@SolarFlare"
            color={'yellow.400'}
            size={'sm'}
            fontFamily={'body'}
          />
        </VStack>
        <HStack
          spacing={['2', '10']}
          justifyContent={'center'}
          color={'white'}
          fontSize="50"
        >
          <a href="https://www.youtube.com/" target={'blank'}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://www.instagram.com/" target={'blank'}>
            <TiSocialInstagramCircular />
          </a>
          <a href="https://www.github.com/solar-flareop" target={'blank'}>
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
