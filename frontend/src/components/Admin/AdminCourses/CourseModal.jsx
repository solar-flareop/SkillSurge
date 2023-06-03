import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/Register';

const CourseModal = ({
  onClose,
  isOpen,
  id,
  courseTitle,
  addLectureHandler,
  deleteButtonHandler,
  lectures = [],
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  return (
    <Modal isOpen={isOpen} size={'full'} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={16}>
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={[0, 16]}>
              <Box my={5}>
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
              </Box>
              <Heading children="Lectures" size={'lg'} />
              <VideoCard
                title="React into"
                num={1}
                description="wdbcdbljcnldjn"
                lectureId="lec123"
                courseId={id}
                deleteButtonHandler={deleteButtonHandler}
              />
            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, video, description)
                }
              >
                <VStack spacing={4}>
                  <Heading
                    children="Add lectures"
                    size={'md'}
                    textTransform={'uppercase'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.valueAsDate)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.valueAsDate)}
                  />
                  <Input
                    required
                    type="file"
                    accept="video/mp4"
                    focusBorderColor="purple.300"
                    css={{
                      '&::file-selector-button': {
                        ...fileUploadCss,
                        color: 'purple',
                      },
                    }}
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}
                  <Button colorScheme="purple" type="submit" w={'full'}>
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
            <Button onClick={onClose}>
                Close
            </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

const VideoCard = ({
  title,
  num,
  description,
  lectureId,
  courseId,
  deleteButtonHandler,
}) => {
  return (
    <Stack
      direction={['column', 'row']}
      my={8}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      borderRadius={'lg'}
      justifyContent={['flex-start', 'space-between']}
      p={[4, 8]}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button
        color={'purple.600'}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
};
