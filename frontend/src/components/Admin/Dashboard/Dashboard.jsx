import {
  Box,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { DoughnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/admin';

import Loader from '../../Layout/Loader/Loader';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    loading,
    stats,
    usersCount,
    viewsCount,
    subscriptionCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    usersProfit,
    viewsProfit,
    subscriptionProfit,
  } = useSelector(state => state.admin);
  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <Grid
      minH={'90vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(${cursor}) ,default`,
      }}
    >
      {loading || !stats ? (
        <Loader color="purple.500" />
      ) : (
        <Box boxSizing="border-box" px={['4', '0']} py={[16, 8]}>
          <Text
            textAlign={'center'}
            opacity={0.5}
            children={`Last change was on ${
              String(new Date(stats[11].createdAt)).split('G')[0]
            }`}
          />
          <Heading
            children="DashBoard"
            ml={[0, 16]}
            mb={8}
            textAlign={['center', 'left']}
          />
          <Stack
            justifyContent={'space-evenly'}
            minH={24}
            direction={['column', 'row']}
          >
            <DataBox
              title="Views"
              qty={viewsCount}
              qtyPercentage={viewsPercentage}
              profit={viewsProfit}
            />
            <DataBox
              title="Users"
              qty={usersCount}
              qtyPercentage={usersPercentage}
              profit={usersProfit}
            />
            <DataBox
              title="Subscription"
              qty={subscriptionCount}
              qtyPercentage={subscriptionPercentage}
              profit={subscriptionProfit}
            />
          </Stack>
          <Box
            borderRadius={'lg'}
            m={['0', '16']}
            p={['0', '16']}
            mt={['4', '16']}
            boxShadow={'-2px 0 10px rgba(107 ,70,193,0.5)'}
          >
            <Heading
              textAlign={['center', 'left']}
              size={'md'}
              children="Views and Users Graph"
              pt={['8', '0']}
              ml={['0', '16']}
            />
            {/* Line Chart */}
            <LineChart stats={stats} />
          </Box>
          <Grid templateColumns={['1fr', '2fr 1fr']}>
            <Box p={4}>
              <Heading
                textAlign={['center', 'left']}
                size={'md'}
                children="Progress Bar"
                my={8}
                ml={[0, 16]}
              />
              <Box>
                <Bar
                  profit={viewsProfit}
                  title={'Views'}
                  value={viewsPercentage}
                />
                <Bar
                  profit={usersProfit}
                  title={'Users'}
                  value={usersPercentage}
                />
                <Bar
                  profit={subscriptionProfit}
                  title={'Subscription'}
                  value={subscriptionPercentage}
                />
              </Box>
            </Box>
            <Box p={[0, 16]} py={4} boxSizing="border-box">
              <Heading
                textAlign={'center'}
                size={'md'}
                mb={4}
                children="Users"
              />
              {/* Doughnut graph */}
              <DoughnutChart
                users={[subscriptionCount, usersCount - subscriptionCount]}
              />
            </Box>
          </Grid>
        </Box>
      )}

      <Sidebar />
    </Grid>
  );
};

export default Dashboard;

const DataBox = ({ title, qtyPercentage, profit, qty }) => {
  return (
    <Box
      width={['70%', '25%']}
      boxShadow={'-2px 0 10px rgba(107 ,70,193,0.5)'}
      p={8}
      borderRadius={'lg'}
      alignSelf={['center', '']}
    >
      <Text children={title} />
      <HStack spacing={8}>
        <Text fontSize={'xl'} children={qty} fontWeight={'bold'} />
        <HStack>
          <Text children={`${qtyPercentage}%`} />
          {profit ? (
            <RiArrowUpLine color="green" />
          ) : (
            <RiArrowDownLine color="red" />
          )}
        </HStack>
      </HStack>
      <Text children="Since last Month" />
    </Box>
  );
};

const Bar = ({ title, value, profit }) => {
  return (
    <Box px={[0, 20]} py={4}>
      <Heading children={title} mb={2} size={'sm'} />
      <HStack w={'full'} alignItems={'center'}>
        <Text children={profit ? '0%' : `-${value}%`} />
        <Progress value={profit ? value : 0} w={'full'} colorScheme="purple" />
        <Text children={`${value > 100 ? value : 100}%`} />
      </HStack>
    </Box>
  );
};
