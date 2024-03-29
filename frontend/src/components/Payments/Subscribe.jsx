import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/user';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import logo from '../../assets/images/logo.png';

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.course);

  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);
    setKey(key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'SkillSurge',
          description: 'Learn to innovate',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Mumbai, India',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    courseError,
    error,
    user.name,
    user.email,
    subscriptionId,
    key,
  ]);

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
          <Button
            colorScheme="yellow"
            w={'full'}
            my={4}
            onClick={subscribeHandler}
            isLoading={loading}
          >
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
