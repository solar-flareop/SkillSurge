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
  loading,
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

  const onCloseHandler = () => {
    onClose();
    setVideo('');
    setVideoPrev('');
    setTitle('')
    setDescription('')
  };

  return (
    <Modal
      isOpen={isOpen}
      size={'full'}
      onClose={onCloseHandler}
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={[16, 8]}>
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={[0, 6]}>
              <Box my={5}>
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
              </Box>
              <Heading children="Lectures" size={'lg'} />
              {lectures.map((i, idx) => (
                <VideoCard
                  key={idx}
                  title={i.title}
                  num={idx + 1}
                  description={i.description}
                  lectureId={i._id}
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                  loading={loading}
                />
              ))}
            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={8}>
                  <Heading
                    children="Add lectures"
                    size={'md'}
                    textTransform={'uppercase'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
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
                  <Button
                    colorScheme="purple"
                    type="submit"
                    w={'full'}
                    isLoading={loading}
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCloseHandler}>Close</Button>
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
  loading,
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
        isLoading={loading}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
};
