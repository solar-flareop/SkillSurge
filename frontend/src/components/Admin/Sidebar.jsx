import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  return (
    <VStack p={16} spacing={8}   boxShadow={'-2px 0 10px rgba(107 ,70,193,0.5)'}>
      <LinkButton
        Icon={RiDashboardFill}
        url={'dashboard'}
        text={'DashBoard'}
        active={location.pathname === '/admin/dashboard'}
      />
      <LinkButton
        Icon={RiAddCircleFill}
        url={'createcourse'}
        text={'Create Course'}
        active={location.pathname === '/admin/createcourse'}
      />
      <LinkButton
        Icon={RiEyeFill}
        url={'courses'}
        text={'Courses'}
        active={location.pathname === '/admin/courses'}
      />
      <LinkButton
        Icon={RiUser3Fill}
        url={'users'}
        text={'Users'}
        active={location.pathname === '/admin/users'}
      />
    </VStack>
  );
};

export default Sidebar;

const LinkButton = ({ Icon, url, text, active }) => {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        variant={'ghost'}
        fontSize={'medium'}
        colorScheme={active ? 'purple' : ''}
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
};
