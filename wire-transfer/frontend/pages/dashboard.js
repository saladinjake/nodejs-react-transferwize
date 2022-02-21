import React, { ReactNode,ReactElement, useState, useEffect } from 'react';
import { login, logOut, setPrevPath } from "../core/redux/actions/auth.action";
import { myTransactions } from "../core/services/transactions.services"
import Currency from 'react-currency-icons'
import Link from "next/link"
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
  // Link,
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
import { connect } from "react-redux";

import RequestLoader from "../core/views/components/RequestLoader"
const handleLogout = async () => {
    await logOut();
    setTimeout(() => {
      if(typeof window!==undefined){
         localStorage.clear()
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

const MobileNav = ({ onOpen, auth: {user  },logout,  ...rest }) => {
  let isLoggedIn = false;
  const [id, setId] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName ] = useState("")
  const [lastName, setLastName] = useState("")
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [token,setToken] = useState("")
  useEffect(async()=>{
      if(typeof window!=="undefined"){
         
        if(window.localStorage && window.localStorage.getItem("user")){
          console.log(window.localStorage.getItem("user"))
          user = JSON.parse(window.localStorage.getItem("user"))
          setId(user.email) // no longer id rather should uniquely identify user from the glance of the app
          setEmail(user.email)
          setFirstName(user.firstName)
          setLastName(user.lastName)
          setIsAuthenticated(user.isAuthenticated)
          setToken(user.token)
          if (user.token && user.isAuthenticated) {
             isLoggedIn = true;
          }
        }else{
          await logOut()
          setTimeout(()=>{window.location.href="/login"},2000)
        }
      }
  },[user])

  
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
                  <Text fontSize="md">{user?.firstName + " "+ user?.lastName }</Text>
                  <Text fontSize="xs" color="gray.600">
                   You are logged in
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
              <Link href="/dashboard"><MenuItem onClick={(e)=>{redirectTo('/dashboard')}}>My Transactions</MenuItem></Link>
               <Link href="/newtransaction"><MenuItem onClick={(e)=>{redirectTo('/newtransaction')}}>New Transaction</MenuItem></Link>
              <MenuDivider />
               <Link href="#"><MenuItem onClick={(e)=>{handleLogout(e)}}>Logout</MenuItem></Link>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};






MobileNav.propTypes = {
  auth: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => ({
  auth: state.auth
});

const MobileNavigate = connect(mapStateToProps, {
  
})(MobileNav);



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
      <MobileNavigate onOpen={onOpen} />
      <Box  ml={{ base: 0, md: 60 }} p="4">
        {children}
         <ActionComponent/>
         <Tradeoffs/>
      </Box>
    </Box>
      </>
  );
}









function ActionComponent() {
  return (
    <Stack bg="#fff"  p="4" boxShadow="lg" m="4" borderRadius="sm">
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
          <Button onClick={()=>{redirectTo("/newtransaction")}} variant="outline" colorScheme="green">
            Create a new transaction
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
      <Flex  color="#000"  h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          TRANSFERWIZ
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Link href="/dashboard"><NavItem icon={FiHome} >Dashboard</NavItem></Link>
      <Link href="/newtransaction"><NavItem icon={FiTrendingUp} >New Transaction</NavItem></Link>      
      <Link href="#"><NavItem icon={FiStar} onClick={(e)=>{handleLogout(e)}}>Logout</NavItem></Link>
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

