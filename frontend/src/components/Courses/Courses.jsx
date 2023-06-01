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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const addToPlaylistHandler = id => {
    console.log(id);
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
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          views={8}
          title={'fghj'}
          id={1}
          creator={'hsjan'}
          description={'sdhsbkhdbks'}
          lectureCount={4849}
          imageSrc={
            'https://images.unsplash.com/photo-1682270251135-b917816669e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          }
          addToPlaylistHandler={addToPlaylistHandler}
        />
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
      />
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text
          children={'Creator'}
          textTransform={'uppercase'}
          fontWeight={'bold'}
        />
        <Text
          children={creator}
          textTransform={'uppercase'}
          fontFamily={'bold'}
        />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lecture - ${lectureCount}`}
        textTransform={'uppercase'}
      />
      <Heading
        size={'xs'}
        children={`Views - ${views}`}
        textTransform={'uppercase'}
      />
      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="yellow">Watch Now</Button>
        </Link>
        <Button
          colorScheme="yellow"
          variant={'ghost'}
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
};
