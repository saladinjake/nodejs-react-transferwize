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


const SIMBA_COMPANY_ID = 4;
const BONUS_AMOUNT = 1000.00;
const SIMBA_ACCOUNT_NUMBER = 2225137327


const  TransactionComponent = ({ auth: {isAuthenticated, user , prevPath } }) =>{
   const [transactions, setTransactions] = useState([])
   const toastedBread = useToast()
   useEffect(async()=>{
   
      try{
      	if(!isAuthenticated){
         await logOut()
         }
         /*This checks if user exists and if user has account if not it creates the existing user account and set the balance to 1000 USD*/
         const userEmail = user?.email;
         const walletAccountDetails = await getWalletAccounts(userEmail);
         // console.log(walletAccountDetails)
         if('data' in walletAccountDetails?.data && Array.isArray(walletAccountDetails?.data?.data)){
          const userAccount = walletAccountDetails.data.data[0]
          const res = await myTransactions(userAccount.accountNumber)
          // console.log(res)
          setTransactions([...res?.data?.data])
          //if first timer then ledger the free gift account bonus given to a signed up user
          if(res?.data?.data?.length <=0){
            let debitorLedgerDetail = {
              accountNumber: SIMBA_ACCOUNT_NUMBER, // THE CREDITING USER ACCOUT
              senderId: SIMBA_COMPANY_ID, 
              amount:BONUS_AMOUNT, // this will be deducted
              receipientId:userEmail
            };
            let creditorLedgerDetail ={
              accountNumber :userAccount.accountNumber, // THE CREDITING USER ACCOUT
              senderId: SIMBA_COMPANY_ID, 
              amount:BONUS_AMOUNT,
              receipientId:userEmail
            }
            await debitLedgerAccount(debitorLedgerDetail)
            await creditLedgerAccount(creditorLedgerDetail)
            const responseLedger = await myTransactions(userAccount.accountNumber)
            setTransactions([...responseLedger?.data?.data])
          }
          
         }else{
            toastedBread({
            title: 'An error occurred.',
            description: "No user account/transactions were found", //error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
         }
         
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

  
  return (
    <Stack bg="#fff" p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">Your Transaction Date</Text>
        <FcLock />
      </Stack>



      
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between">
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          FROM
        </Text>
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'6xl'}>
          TO
        </Text>
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          AMOUNT
        </Text>
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
         CURRENCY
        </Text>

        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          CURRENCY
        </Text>
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
         CREATED AT
        </Text>
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
         UPDATED AT
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }}>
          
          <Button colorScheme="green">  Successful</Button>
        </Stack>
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between">
        {
          transactions.map(transaction => {
             return(
             <>
                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                  SIMBA
                </Text>
                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'6xl'}>
                  JUWAVICTOR 
                </Text>
                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                  2000
                </Text>
                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                 $
                </Text>

                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                  CURRENCY
                </Text>
                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                 CREATED AT
                </Text>
                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                 UPDATED AT
                </Text>
                <Stack direction={{ base: 'column', md: 'row' }}>
                  
                  
                </Stack>
             </>

             )
          })
        }
        
      </Stack>
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