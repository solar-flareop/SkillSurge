import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';

const AdminCourses = () => {
  const courses = [
    {
      _id: '456',
      title: 'react',
      category: 'web',
      poster: {
        url: 'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
      },
      createdBy: 'solarflare',
      views: 100,
      noOfVideos: 10,
    },
  ];
  const { isOpen, onClose, onOpen } = useDisclosure();
  const deteleButtonHandler = userId => {
    console.log(userId);
  };
  const courseDetailsHandler = userId => {
    onOpen();
  };

  const deleteModalLectureButtonHandler = (courseId, lectureId) => {
    console.log(courseId, lectureId);
  };

  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
  };
  return (
    <Grid
      minH={'90vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(${cursor}) ,default`,
      }}
    >
      <Box p={[0, 6]} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          my={14}
          textAlign={['center', 'left']}
          children="All Courses"
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={['lg', 'md']}>
            <TableCaption>All available courses in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <CustomRow
                  key={item._id}
                  item={item}
                  courseDetailsHandler={courseDetailsHandler}
                  deteleButtonHandler={deteleButtonHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Modal */}
        <CourseModal
          id={'randomid'}
          courseTitle={'MERN'}
          isOpen={isOpen}
          onClose={onClose}
          deleteButtonHandler={deleteModalLectureButtonHandler}
          addLectureHandler={addLectureHandler}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

const CustomRow = ({ item, deteleButtonHandler, courseDetailsHandler }) => {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td isNumeric>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.noOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color={'purple.500'}
            onClick={() => courseDetailsHandler(item._id)}
          >
            View Lectures
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

export default AdminCourses;
