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
import React, { useEffect, useState } from 'react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';

const AdminCourses = () => {
  const dispatch = useDispatch();
  const [courseId, setcourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const { courses, lectures } = useSelector(state => state.course);
  const { loading, error, message } = useSelector(state => state.admin);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const deteleButtonHandler = courseId => {
    dispatch(deleteCourse(courseId));
  };

  const courseDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId));
    onOpen();
    setcourseId(courseId);
    setCourseTitle(title);
  };

  const deleteModalLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video); //in multer name is file
    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    dispatch(getAllCourses());
  }, [dispatch, error, message]);

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
                  loading={loading}
                  courseDetailsHandler={courseDetailsHandler}
                  deteleButtonHandler={deteleButtonHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Modal */}
        <CourseModal
          id={courseId}
          courseTitle={courseTitle}
          isOpen={isOpen}
          onClose={onClose}
          deleteButtonHandler={deleteModalLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
          loading={loading}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

const CustomRow = ({
  loading,
  item,
  deteleButtonHandler,
  courseDetailsHandler,
}) => {
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
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color={'purple.500'}
            isLoading={loading}
            onClick={() => courseDetailsHandler(item._id, item.title)}
          >
            View Lectures
          </Button>
          <Button
            color={'purple.600'}
            isLoading={loading}
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
