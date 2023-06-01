import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <Container h={'90vh'}>
      <VStack justifyContent={'center'} h={'full'} spacing={4}>
        <RiErrorWarningFill color="red" size={'3rem'} />
        <Heading children="Page not found" />
        <Link to="/">
          <Button variant={'ghost'}>Go to home</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default Notfound;
