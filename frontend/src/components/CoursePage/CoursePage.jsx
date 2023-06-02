import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import introVideo from '../../assets/videos/intro.mp4';
import { useState } from 'react';

const CoursePage = () => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const lectures = [
    {
      _id: 1,
      title: 'Suarhj,',
      description: '4567ejdhbnsl',
      video: {
        url: 'url',
      },
    },
    {
      _id: 2,
      title: 'Suarhj0,',
      description: '4567ejdhbnsl',
      video: {
        url: 'url',
      },
    },
    {
      _id: 3,
      title: 'Suarhj6,',
      description: '4567ejdhbnsl',
      video: {
        url: 'url',
      },
    },
  ];
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
          width={'100%'}
          height={"50%"}
          controls
          src={introVideo}
          controlsList="nodownload  noremoteplayback "
          disableRemotePlayback
          disablePictureInPicture
        ></video>
        <Heading m={4}>
          {`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
        </Heading>
        <Heading m={4} size={'md'}>Description</Heading>
        <Text m={4} children={lectures[lectureNumber].description} />
      </Box>
      <VStack>
        {lectures.map((element, index) => (
          <button
            onClick={() => setLectureNumber(index)}
            key={element._id}
            style={{
              width: '100%',
              padding: '1rem',
              margin: 0,
              textAlign: 'center',
              borderBottom: ' 1px solid rgba(0,0,0,0.2)',
            }}
          >
            <Text noOfLines={1}>
              #{index + 1} {element.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CoursePage;
