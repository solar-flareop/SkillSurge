import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    'Web Development',
    'Artificial Intellegence',
    'Data Structures & Algorithms',
    'App Development',
    'Game Development',
    'Data Science',
    'Full-Stack Development',
  ];

  const dispatch = useDispatch();

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [keyword, category, dispatch, error, message]);

  const addToPlaylistHandler = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };

  return (
    <Container minH={'95vh'} paddingY={8} maxW={'container.lg'}>
      <Heading children="All Courses" m={8} />

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type="text"
        focusBorderColor="yellow.500"
      />
      <HStack
        paddingY={8}
        overflowX={'auto'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, idx) => (
          <Button key={idx} minW={60} onClick={() => setCategory(item)}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses &&
          courses.map(item => (
            <Course
              key={item._id}
              views={item.views}
              title={item.title}
              id={item._id}
              creator={item.createdBy}
              description={item.description}
              lectureCount={item.numOfVideos}
              imageSrc={item.poster.url}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading children="Courses not found!" mt={4} opacity={0.7} />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;

const Course = ({
  views,
  title,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  imageSrc,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW={'200px'}
        noOfLines={3}
        size={'sm'}
        children={title}
        color={'black'}
      />
      <Text noOfLines={2} children={description} color={'black'} />
      <HStack>
        <Text
          children={'Creator'}
          textTransform={'uppercase'}
          fontWeight={'bold'}
          color={'black'}
        />
        <Text
          children={creator}
          textTransform={'uppercase'}
          fontFamily={'body'}
          color={'black'}
        />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lecture - ${lectureCount}`}
        textTransform={'uppercase'}
        color={'black'}
      />
      <Heading
        size={'xs'}
        children={`Views - ${views}`}
        textTransform={'uppercase'}
        color={'black'}
      />
      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="yellow">Watch Now</Button>
        </Link>
        <Button
          colorScheme="telegram"
          variant={'outline'}
          onClick={() => addToPlaylistHandler(id)}
          isLoading={loading}
        >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
};
