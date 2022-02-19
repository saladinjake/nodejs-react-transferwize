import React, { ReactNode,ReactElement, useState, useEffect } from 'react';
import { login, logOut, setPrevPath } from "../core/redux/actions/auth.action";

import Currency from 'react-currency-icons'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Button,
   SimpleGrid
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import Tradeoffs from "../core/views/components/Tradeoffs"

import { FcLock } from 'react-icons/fc';
import PropTypes from "prop-types";



const handleLogout = async () => {
  console.log("called")
    await logOut();
    setTimeout(() => {
      if(typeof window!==undefined){
         window.location.href="/login"
      }
     
    }, 2000);
  };

  const redirectTo = (url) =>{
      
    setTimeout(() => {
       if(typeof window!==undefined){
        window.location.href=url
      }
    }, 1000);
  }
const LinkItems = [
  { name: 'dashboard', icon: FiHome , clickHandler: redirectTo, route:"dashboard" },
  { name: 'New Transaction', icon: FiTrendingUp, clickHandler: redirectTo, route:"newtransaction" },
  
  { name: 'Logout', icon: FiStar, clickHandler: handleLogout, route:""  },
  
];



export default function Dashboard({
  children,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarNavigationContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarNavigationContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box  ml={{ base: 0, md: 60 }} p="4">
        {children}
         <ActionComponent/>
        <AccountBalanceView/>
       

        <Tradeoffs/>
         
      </Box>


      
    </Box>


   

      </>
  );
}










const CardBalance = ({ title, text, icon }) => {
  return (
    <Stack  bg="#fff" boxShadow="lg" m="4" borderRadius="sm">
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
        padding="10px"
        >
        {icon}
      </Flex>
      <Text padding="10px" fontWeight={600}>{title}</Text>
      <Text padding="10px" color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

function AccountBalanceView() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <CardBalance
          icon={ <Currency code="USD" size="small" />}
          title={'Lifetime Support'}
          text={
            '1000'
          }
        />
        <CardBalance
          icon={<Currency code="EUR" size="small" />}
          title={'Unlimited Donations'}
          text={
            '0'
          }
        />
        <CardBalance
          icon={<Currency code="NGN" size="small" />}
          title={'Instant Delivery'}
          text={
            '0'
          }
        />
      </SimpleGrid>
    </Box>
  );
}

function ActionComponent() {
  return (
    <Stack  p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">All Transactions</Text>
        
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between">
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          Transaction History
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }}>
          <Button variant="outline" colorScheme="green">
            Send Money
          </Button>
     
        </Stack>
      </Stack>
    </Stack>
  );
}






const SidebarNavigationContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="2s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          TRANSFERWIZ
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={()=>{link.clickHandler()}}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        TRANSFERWIZ
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://avatars.githubusercontent.com/u/26296603?v=4'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Hello world</Text>
                  <Text fontSize="xs" color="gray.600">
                   You are logged 
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={(e)=>{redirectTo('/dashboard')}}>My Transactions</MenuItem>
              <MenuItem onClick={(e)=>{redirectTo('/newtransaction')}}>New Transaction</MenuItem>
              <MenuDivider />
              <MenuItem onClick={(e)=>{handleLogout(e)}}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};







