import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';


const Users = () => {
  const dispatch = useDispatch();
  const { users, loading,error,message } = useSelector(state => state.admin);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    dispatch(getAllUsers());

  }, [dispatch, error, message]);


  const deteleButtonHandler = userId => {
    dispatch(deleteUser(userId))
  };

  const updateHandler = userId => {
    dispatch(updateUserRole(userId))
  };

  return (
    <Grid
      minH={'90vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(${cursor}) ,default`,
      }}
    >
      
        <Box p={[0, 10]} overflowX={'auto'}>
          <Heading
            textTransform={'uppercase'}
            my={16}
            textAlign={['center', 'left']}
            children="All Users"
          />
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size={'lg'}>
              <TableCaption>All available users in the database</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Subscription</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users &&
                  users.map(item => (
                    <CustomRow
                      key={item._id}
                      item={item}
                      updateHandler={updateHandler}
                      deteleButtonHandler={deteleButtonHandler}
                      loading={loading}
                    />
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

      <Sidebar />
    </Grid>
  );
};

export default Users;

const CustomRow = ({ item, deteleButtonHandler, updateHandler,loading }) => {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'active'
          ? 'Active'
          : 'Not Active'}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color={'purple.500'}
            onClick={() => updateHandler(item._id)} isLoading={loading}
          >
            Change Role
          </Button>
          <Button
            color={'purple.600'}
            onClick={() => deteleButtonHandler(item._id)}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};
