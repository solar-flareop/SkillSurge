import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <Container h={'90vh'} p={12}>
      <Heading my={2} textAlign={'center'} children="You have Pro Pack" />
      <VStack
        boxShadow={'lg'}
        pb={16}
        alignItems={'center'}
        borderRadius={'lg'}
      >
        <Box
          w={'full'}
          p={4}
          bg={'yellow.400'}
          css={{ borderRadius: ' 8px 8px 0 0' }}
        >
          <Text children="Payment Successful" color={'black'} />
        </Box>
        <Box p={4}>
          <VStack spacing={8} mt={4} px={8} textAlign={'center'}>
            <Text>
              {' '}
              Congratulations you're a pro member. You have access to premium
              content.
            </Text>
            <Heading size={'xl'}>
              <RiCheckboxCircleFill color='green' />
            </Heading>
          </VStack>
        </Box>
        <Link to="/profile">
          <Button variant={'ghost'}>Go to profile</Button>
        </Link>
        <Heading size={'xs'}>Reference No:12345fghjktyui</Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
