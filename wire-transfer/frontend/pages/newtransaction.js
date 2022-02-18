import React, { ReactNode,ReactElement, useState, useEffect } from "react";


import Currency from 'react-currency-icons'
import AsyncSelect from 'react-select/async';
import axios      from 'axios'
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
   SimpleGrid,


Select,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Heading
  
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
import { FcLock } from 'react-icons/fc';
import * as  CurrencyIconSet from 'react-currency-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyncAlt,
  faDollarSign,
  faEuroSign,
} from "@fortawesome/free-solid-svg-icons";
/*apis*/
import { searchUser } from "../core/services/auth.services"
import currencies from "../core/services/currencylist.service.json";

const LinkItems = [
  { name: 'dashboard', icon: FiHome },
  { name: 'New Transaction', icon: FiTrendingUp },
  { name: 'Account Settings', icon: FiCompass },
  { name: 'Logout', icon: FiStar },
  
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
         <NewTransfer/>
      </Box>


      
    </Box>


   

      </>
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
        <NavItem key={link.name} icon={link.icon}>
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
              <MenuItem>My Transactions</MenuItem>
              <MenuItem>New Transaction</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};













function NewTransfer() {
  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    // setState({ inputValue });
    // return inputValue;
  };

  const [inputFrom, setInputFrom] = useState(0);
  const [inputTo, setInputTo] = useState(0);
  const [rate, setRate] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const handleChangeFrom = (event) => {
    const { value } = event.target;
    setInputFrom(value);
    setInputTo(value * rate);
  };

  const handleChangeTo = (event) => {
    const { value } = event.target;
    setInputTo(value);
    setInputFrom(value / rate);
  };

  const handleSelectFrom = (event) => {
    const { value } = event.target;
    setCurrencyFrom(value);
  };

  const handleSelectTo = (event) => {
    const { value } = event.target;
    setCurrencyTo(value);
  };

  const handleSwap = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  useEffect(() => {
    const fetchConversionRates = async () => {
      const result = await fetch(
        `https://v6.exchangerate-api.com/v6/ed66962687fdf4b5a9afb6c6/pair/${currencyFrom}/${currencyTo}`
      );
      console.log(result);
      if (result.ok) {
        const rates = await result.json();
        setRate(rates.conversion_rate);
      }
    };
    fetchConversionRates();
  }, [currencyFrom, currencyTo]);

  return (
    <Flex
      minH={'100vh'}

      
      w="100%"
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack  w="100%" spacing={8} maxW={'lg'} >
        
        <Box

          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack >
            <FormControl id="email">
              <FormLabel>Find User</FormLabel>
                <div>
                  <AsyncSelect
                    name="form-field-name"
                    value="one"
                    loadOptions={searchUser}
                    searchUser onInputChange={handleInputChange}
                  />
                </div>
            </FormControl>



            <div className="App">
      <Flex justifyContent="space-between">
          <FontAwesomeIcon icon={faDollarSign} size="2x" />
        <h2> TRANSFERWIZ </h2>
        <FontAwesomeIcon icon={faEuroSign} size="2x" />
      </Flex>

      <Box p="20px">
       <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <p>
                 1 {currencyFrom} = {rate} {currencyTo}
               </p>
                <Button id="swap-icon">
              <Text  
                onClick={handleSwap}
              >Swap</Text>
            </Button> 
              </Stack>   
</Box>
      <div id="container">
        <div id="content-box">
          <FormControl id="email">
              <FormLabel>From Amount</FormLabel>
            <Input
              id="amountFrom"
              type="number"
              value={inputFrom}
              onChange={handleChangeFrom}
            />

            </FormControl>
 <FormControl id="email">
              <FormLabel>To Amount</FormLabel>
            <Input
              id="amountTo"
              type="number"
              value={inputTo}
              onChange={handleChangeTo}
            />
           </FormControl>

             <br/>
          <div id="selectors">
          <FormLabel>From Currency</FormLabel>
            <Select onChange={handleSelectFrom} value={currencyFrom}>
              {Object.keys(currencies).map((currency, index) => (
                <option value={currency} key={index}>
                  {currency} - {currencies[currency].name}
                </option>
              ))}
            </Select>


               <br/>
<FormLabel>To Currency</FormLabel>
            <Select onChange={handleSelectTo} value={currencyTo}>
              {Object.keys(currencies).map((currency, index) => {
                return (
                  <option value={currency} key={index}>
                    {currency} - {currencies[currency].name}
                  </option>
                );
              })}
            </Select>


           

          </div>
        </div>
      </div>
    </div>
            
            <Stack spacing={10}>
              
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
               Transfer Money
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}