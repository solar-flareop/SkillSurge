import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

const Subscribe = () => {
  return (
    <Container h={'100vh'} p={8}>
      <Heading my={8} textAlign={'center'} children="Welcome" />
      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={0}
      >
        <Box bg={'yellow.400'} p={2} css={{ borderRadius: '8px 8px 0 0 ' }}>
          <Text color={'black'} children="Pro Pack - ₹299.0" />
        </Box>
        <Box p={4}>
          <VStack textAlign={'center'} spacing={4} mt={4} px={2}>
            <Text children="Join Pro Pack and get access to all content." />
            <Heading size={'md'} children="₹299 Only" />
          </VStack>
          <Button colorScheme="yellow" w={'full'} my={4}>
            {' '}
            Buy Now
          </Button>
        </Box>
        <Box
          bg={'blackAlpha.600'}
          css={{ borderRadius: ' 0 0 8px 8px  ' }}
          p={4}
        >
          <Heading
            color={'white'}
            textTransform={'uppercase'}
            size={'sm'}
            children={'100% refund at cancellation'}
          />
          <Text children="*T&C applied " color={'white'} fontSize={'xs'} />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
