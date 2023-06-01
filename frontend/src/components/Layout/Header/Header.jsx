import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { RiMenu5Fill, RiLogoutBoxLine, RiDashboardFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isAuthenticated = false;
  const user = {
    role: 'admin',
  };
  const logoutHandler = () => {
    onClose();
  };

  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme="yellow"
        h={'12'}
        w={'12'}
        rounded={'full'}
        position={'fixed'}
        top={6}
        left={6}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={2}>Online Adda</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} alignItems={'flex-start'}>
              <DrawerLinkButton onClose={onClose} url="/" title="Home" />
              <DrawerLinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
              />
              <DrawerLinkButton
                onClose={onClose}
                url="/request"
                title="Request A Course"
              />
              <DrawerLinkButton
                onClose={onClose}
                url="/contact"
                title="Contact Us"
              />
              <DrawerLinkButton onClose={onClose} url="/about" title="About" />

              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width={'80%'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link to="/profile" onClick={onClose}>
                          <Button varient={'ghost'} colorScheme="yellow">
                            Profile
                          </Button>
                        </Link>
                        <Button varient={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link to="/admin/dashboard" onClick={onClose}>
                          <Button variant={'ghost'} colorScheme="purple">
                            <RiDashboardFill />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={onClose}>
                      <Button colorScheme="yellow">Login</Button>
                    </Link>
                    <p>or</p>
                    <Link to="/register" onClick={onClose}>
                      <Button colorScheme="yellow">Sign Up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;

const DrawerLinkButton = ({ url = '/', title = 'Home', onClose }) => {
  return (
    <Link to={url} onClick={onClose}>
      <Button variant={'ghost'}>{title}</Button>
    </Link>
  );
};
