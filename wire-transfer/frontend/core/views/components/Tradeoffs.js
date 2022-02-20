import React, { ReactNode,ReactElement, useState, useEffect } from 'react';
import { login, logOut, setPrevPath } from "../../redux/actions/auth.action";

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


import { FcLock } from 'react-icons/fc';
import { myTransactions, getWalletAccounts, creditLedgerAccount, debitLedgerAccount } from "../../services/transactions.services"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useToast } from '@chakra-ui/react'
import RequestLoader from "./RequestLoader"
import  TransactionTables from "./TransactionTables"
const SIMBA_COMPANY_ID = 4;
const BONUS_AMOUNT = 1000.00;
const SIMBA_ACCOUNT_NUMBER = 2225137327




const CardBalance = ({ title, text, icon }) => {
  return (
    <Stack  bg="#fff" boxShadow="lg" m="4" borderRadius="sm">
      <Flex
        w={16}
        h={16}
        align={'center'}
       justify={'center'} justifyContent={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
        padding="1px"
        ml="20px"
        mt="20px"

        >
        {icon}
      </Flex>
      <Text justify={'center'} justifyContent={'center'} padding="20px" fontWeight={600}>{title}</Text>
      <Text justify={'center'} justifyContent={'center'} padding="20px" fontWeight={600} color={'green'}>{text}</Text>
    </Stack>
  );
};

const  TransactionComponent = ({ auth: {user  } }) =>{
   const [transactions, setTransactions] = useState([])
   const toastedBread = useToast()
   const [lastTrnx ,setLastTransaction] = useState({})



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

   useEffect(async()=>{
   
      try{
      	if(!isAuthenticated){
         await logOut()
         }
         /*This checks if user exists and if user has account if not it creates the existing user account and set the balance to 1000 USD*/
         const userEmail = user?.email;
         const walletAccountDetails = await getWalletAccounts(userEmail);
        // console.log(walletAccountDetails.data.data)
         if('data' in walletAccountDetails.data &&  Array.isArray(walletAccountDetails?.data?.data) ){
           const existingAccount =  walletAccountDetails.data.data[0];
           if('accountNumber' in existingAccount ){
             console.log("true")
              const myTransactionLedgers = await myTransactions(existingAccount.accountNumber)
              console.log(myTransactionLedgers)
              setTransactions([...myTransactionLedgers?.data?.data])
              console.log(transactions)
         
           }else{
             // new user has no account so automatically create one for user signed up
              console.log("false")



           }
           
         }else{
           //app accessed in error
            toastedBread({
            title: 'An error occurred.',
            description: "No user account/transactions were found", //error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })

         }
         // if('data' in walletAccountDetails?.data && Array.isArray(walletAccountDetails?.data?.data)){
         //  const userAccount = walletAccountDetails.data.data[0]
         //  const res = await myTransactions(userAccount.accountNumber)
         //  console.log(res)
         //  setTransactions([...res?.data?.data])
         //  console.log(transactions)
          //if first timer then ledger the free gift account bonus given to a signed up user
         //  if(res?.data?.data?.length <=0){
         //    let debitorLedgerDetail = {
         //      accountNumber: SIMBA_ACCOUNT_NUMBER, // THE CREDITING USER ACCOUT
         //      senderId: SIMBA_COMPANY_ID, 
         //      amount:BONUS_AMOUNT, // this will be deducted
         //      receipientId:userEmail
         //    };
         //    let creditorLedgerDetail ={
         //      accountNumber :userAccount.accountNumber, // THE CREDITING USER ACCOUT
         //      senderId: SIMBA_COMPANY_ID, 
         //      amount:BONUS_AMOUNT,
         //      receipientId:userEmail
         //    }
         //    await debitLedgerAccount(debitorLedgerDetail)
         //    await creditLedgerAccount(creditorLedgerDetail)
         //    const responseLedger = await myTransactions(userAccount.accountNumber)
         //    setTransactions([...responseLedger?.data?.data])
            
         //  }
          
         // }else{
         //    toastedBread({
         //    title: 'An error occurred.',
         //    description: "No user account/transactions were found", //error.message,
         //    status: 'error',
         //    duration: 9000,
         //    isClosable: true,
         //  })
         // }
         
      }catch(error){
        
        toastedBread({
            title: 'An error occurred.',
            description: error?.message || error, //error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
       
      }
     
   },[])

    const lastTransaction = transactions[transactions.length -1]  
    //console.log(lastTransaction)
 
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">


              <Box p={4} >
      <SimpleGrid  bg="#fff" columns={{ base: 1, md: 3 }} spacing={10}>
        <CardBalance
          icon={ <Currency code="USD" size="small" />}
          title={'Balance in Dollars'}
          text={
           lastTransaction?.newBalance
          }
        />
        <CardBalance
          icon={<Currency code="EUR" size="small" />}
          title={'Balance in Naira'}

          text={
            lastTransaction?.newbalancenaira
          }
        />
        <CardBalance
          icon={<Currency code="NGN" size="small" />}
          title={'Balance in Euros'}
          text={
           lastTransaction?.newbalanceeuros
          }
        />
      </SimpleGrid>
    </Box>


      <Stack bg="#fff" direction="row" padding="20px" alignItems="center">
        <Text fontWeight="semibold">Your Transaction </Text>
        <FcLock />
      </Stack>



      

      <TransactionTables data={transactions}/>

      
    </Stack>
  );
}


TransactionComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  
})(TransactionComponent);