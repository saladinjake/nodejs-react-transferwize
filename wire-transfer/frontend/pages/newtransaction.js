import React, { ReactNode,ReactElement, useState, useEffect } from "react";
import { login, logOut, setPrevPath } from "../core/redux/actions/auth.action";

import Link from "next/link"
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
import RequestLoader from "../core/views/components/RequestLoader"
import { useToast } from '@chakra-ui/react'

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { useRouter } from 'next/router';

import { sendMoneyOverseas } from "../core/services/transactions.services" 

const LinkItems = [
  { name: 'dashboard', icon: FiHome },
  { name: 'New Transaction', icon: FiTrendingUp },
  { name: 'Account Settings', icon: FiCompass },
  { name: 'Logout', icon: FiStar },
  
];



const handleLogout = async () => {
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





const MobileNav = ({ onOpen, auth: {user  }, ...rest }) => {
const router = useRouter();
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
          setId(user.id)
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



const mapStateToProps3 = (state) => ({
  auth: state.auth
});

const MobileNavigate = connect(mapStateToProps3, {
  
})(MobileNav);



function NewTransfer({ auth: {  user , prevPath } }) {
  
 
  const toastedBread = useToast()
  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    // setState({ inputValue });
    return inputValue;
  };

  let isLoggedIn = false;
  
  const [id, setId] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName ] = useState("")
  const [lastName, setLastName] = useState("")
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [token,setToken] = useState("")

  useEffect(async()=>{
      if(typeof window!=="undefined"){
        //  console.log(user)
        if(window.localStorage && window.localStorage.getItem("user")){
         // console.log(window.localStorage.getItem("user"))
          user = JSON.parse(window.localStorage.getItem("user"))
          setId(user.id)
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

  const [inputFrom, setInputFrom] = useState(0);
  const [inputTo, setInputTo] = useState(0);
  const [rate, setRate] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const [allUsers, setAllUsers] = useState([])

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




  //payload submit transaction payload and validation

  const transactionPayload = {
    name:'',
    sendingAmount:0.00,
    receivingAmount: 0.00, 
    rate:1,
    senderid: id,
    receipientId: null,
    sendingCurrency:currencyFrom,
    receivingCurrency:currencyTo,

  };

  const [submitData, setSubmitData] = useState(transactionPayload)
  const [isSubmitClick, setIsSubmitClicked] = useState(false)

  const getUserEmail = (searchName) =>{
    const firstName = searchName.split()[0]
    const foundUser = allUsers.find(user =>{
       const testData = user.firstname + " " + user.lastname
       if(
        testData.toLowerCase()===searchName.toLowerCase()
          
        ){
         return user.email
       }else{
        return ""
       }
    })
  }

  const handleSelectedUser = () => {
    const userInputHtml = document.getElementById("wizards")
    const userInputCopy =  userInputHtml.value.toLowerCase();

    const foundUser = allUsers.find(user =>{
       const testData = user.firstname + " " + user.lastname 
       if(testData.toLowerCase()===userInputCopy){
        return user.email
       }else{
        return ""
       }
    })
   // console.log(foundUser)
    if(!foundUser || foundUser.length<=0){
      userInputHtml.value =""
       toastedBread({
        title: 'An error occurred.',
        status:"error",
        description: "User dont exist. please select a user from the dropdown",
        duration: 9000,
        isClosable: true,
      })
       return null
    }else{
      //set state of the field
       return foundUser
    }
  }
  

  useEffect(() => {

    const fetchConversionRates = async () => {
      const result = await fetch(//
        //8c627c48be6db29a67c2b7cf
        `https://v6.exchangerate-api.com/v6/ed66962687fdf4b5a9afb6c6/pair/${currencyFrom}/${currencyTo}`
      );
      //console.log(result);
      if (result.ok) {
        const rates = await result.json();
        setRate(rates.conversion_rate);
        setSubmitData({
          ...submitData,
          rate:rates.conversion_rate
        })
      }
    };
    fetchConversionRates();
  }, [currencyFrom, currencyTo]);


  useEffect(() => {
    const findUsers = async () => {
      const result = await searchUser()
      //console.log(result.data);
      setAllUsers([...result.data.data]) 
    };
    findUsers();
  }, []);

  const handleSubmitTransactionExchange = async () =>{
    setIsSubmitClicked(true)
     const selectedUser = document.getElementById("wizards").value
    if(!selectedUser ){
      toastedBread({
        title: 'An error occurred.',
        status:"error",
        description: "Receipient User not selected. ",
        duration: 9000,
        isClosable: true,
      })
      setIsSubmitClicked(false)
      return false
    }
     const creditLedgerPayload = {
        name: document.getElementById("wizards").value,
        amount:inputFrom,
        exchangeAmount: inputTo,
        rate:rate,
        sendingCurrency:currencyFrom,
        receivingCurrency:currencyTo,
        senderId: id,
        receipientId: handleSelectedUser().email,
      };
      const debitLedgerPayload = {
        name: firstName + " " + lastName,
        amount:inputFrom,
        exchangeAmount: inputTo,
        rate:rate,
        sendingCurrency:currencyFrom,
        receivingCurrency:currencyTo, 
        senderId: handleSelectedUser().id,
        receipientId: email,
        
      };
      console.log(creditLedgerPayload)
      console.log(debitLedgerPayload)
      Object.keys(creditLedgerPayload).forEach(key =>{
         if(creditLedgerPayload[key]==""  || creditLedgerPayload[key]==undefined || creditLedgerPayload[key]==null ){
             toastedBread({
              title: 'An error occurred.',
              status:"error",
              description: "Transaction could not be processed. Ensure all fields are filled",
              duration: 9000,
              isClosable: true,
            })
             setIsSubmitClicked(false)
            return false
         }

         if(key==="exchangeAmount" || key==="amount"){
           if(debitLedgerPayload[key]<=0){
               toastedBread({
              title: 'An error occurred.',
              status:"error",
              description: "Enter an amount value greater than zero",
              duration: 9000,
              isClosable: true,
            })
                setIsSubmitClicked(false)
            return false
           }
         }
      })

      Object.keys(debitLedgerPayload).forEach(key =>{
         if(debitLedgerPayload[key]==""  || debitLedgerPayload[key]==undefined || debitLedgerPayload[key]==null ){
             toastedBread({
              title: 'An error occurred.',
              status:"error",
              description: "Transaction could not be processed. Ensure all fields are filled",
              duration: 9000,
              isClosable: true,
            })
              setIsSubmitClicked(false)
            return false
         }

         if(key==="exchangeAmount" || key==="amount"){
           if(debitLedgerPayload[key]<=0){
               toastedBread({
              title: 'An error occurred.',
              status:"error",
              description: "Enter an amount value greater than zero",
              duration: 9000,
              isClosable: true,
            })
                setIsSubmitClicked(false)
            return false
           }
         }
      })

      try{

        const transactionSuccessful = await sendMoneyOverseas(creditLedgerPayload,debitLedgerPayload)
      if(transactionSuccessful=="OK"){
        // toast yippikayeh M**F**KA!!!
         setIsSubmitClicked(false)
        toastedBread({
              title: 'SUCCESSFUL',
              status:"success",
              description: "Transaction was successful",
              duration: 9000,
              isClosable: true,
        })
      }

      }catch(error){

          toastedBread({
              title: 'Error',
              status:"error",
              description: error.message|| error.toString(),
              duration: 9000,
              isClosable: true,
        })    
      }

        setIsSubmitClicked(false)

      
  }



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

           <Flex justifyContent="space-between" bg="#f5f5f5" padding="10px">
              <FontAwesomeIcon icon={faDollarSign} size="2x" />
            <h2> Exchange Currencies </h2>
            <FontAwesomeIcon icon={faEuroSign} size="2x" />
          </Flex>

            <FormControl id="email">
              <FormLabel>Receipient Name:</FormLabel>
                
                <div>
                  
                  <Input  type="text" id="wizards" name="wizards" list="users-list" />
                  <datalist id="users-list">

                     { 
                       allUsers.length > 0 ?  allUsers.map(user => {
                          return (
                           <option>{user.firstname + " "+ user.lastname }</option>
                            )
                       })
                       : (<RequestLoader/>)
                     }


                   
                  </datalist>
                </div>
            </FormControl>



            <div>
     

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
                }}
                disabled={isSubmitClick ? true : false}
                onClick={(e)=>{
                  e.preventDefault()
                  handleSubmitTransactionExchange(e)
                }}
                >
               Quick Transfer
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}


NewTransfer.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const FTransaction = connect(mapStateToProps, {})(NewTransfer);
 
 const Dashboard = ({
  auth: {isAuthenticated, token, user , prevPath },
  children,
}) =>{
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
         <FTransaction/>
      </Box>


      
    </Box>


   

      </>
  );
}








Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps2 = (state) => ({
  auth: state.auth
});

const FTransactionDashboard = connect(mapStateToProps2, {})(Dashboard);




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








export default FTransactionDashboard 