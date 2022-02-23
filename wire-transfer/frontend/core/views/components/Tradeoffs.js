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
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useToast } from '@chakra-ui/react'
import RequestLoader from "./RequestLoader"
import  TransactionTables from "./TransactionTables"
import { useRouter } from "next/router"
import { 
  fetchConversionRates,
  deriveForeignExchangeAccountBalance,
  myTransactions, getWalletAccounts,
  creditLedgerAccount, debitLedgerAccount
} from "../../services/transactions.services" 

import { 
  formatCurrency,
  truncate } from "../../helpers/utils/functions";
// console.log( deriveForeignExchangeAccountBalance("USD","NGN",100))
import { 
  SIMBA_COMPANY_ID, BONUS_AMOUNT, 
  SIMBA_ACCOUNT_NUMBER,
  SIMBA_COMPANY_EMAIL 
} from "../../config/api_config/constants"
import { Loader, SomethingWentWrong } from "./Feedback"




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
   const [NEWBALANCE, SETNEWBALANCE] = useState(0);
   const [EQUIVALENT_BALANCE_IN_NGN,setNGNBAL] = useState(0)
   const [EQUIVALENT_BALANCE_IN_EUR, setEURBAL] = useState(0)
   const router = useRouter()

  let isLoggedIn = false;  
  const [id, setId] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName ] = useState("")
  const [lastName, setLastName] = useState("")
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [token,setToken] = useState("")
  const [myWalletAccount, setMyWalletAccount] = useState({})

  const [animateLoader, setAnimateLoader] = useState(false)
 const [ifSomethingWentWrong,setIfSomethingWentWrong] = useState(false)


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




  const recalculateAtomicBalance = (wallet) =>{
    if(wallet.accountNumber){
      
          try{

            deriveForeignExchangeAccountBalance("USD",
              "NGN",
              wallet.balance).then(balNGN =>{
                setNGNBAL(balNGN.toLocaleString())
                 console.log(balNGN)
              })
            deriveForeignExchangeAccountBalance(
              "USD","EUR",
              wallet.balance).then(balEUR=>{
                console.log(balEUR)
                setEURBAL(balEUR.toLocaleString())
              })

              SETNEWBALANCE(wallet.balance.toLocaleString())
              console.log(wallet.balance)

          }catch(error){
             setIfSomethingWentWrong(true)
          }
            
    }
  }

   useEffect(async()=>{
      setAnimateLoader(true)
      try{
      	if(!isAuthenticated){
         await logOut()
         }
         /*This checks if user exists and if user has account if not it creates the existing user account and set the balance to 1000 USD*/
         const userEmail = user?.email;
         console.log(userEmail)
         let walletAccountDetails = await getWalletAccounts(userEmail);
       

         let existingAccount =  walletAccountDetails.data.data[0];
        
          //for reocuring users only
          recalculateAtomicBalance(existingAccount)    

        // console.log(walletAccountDetails.data.data)
        //for fresh time users who need bonus topups of our generousity as simba
         if('data' in walletAccountDetails.data &&  Array.isArray(walletAccountDetails?.data?.data) ){
           let existingAccount =  walletAccountDetails.data.data[0];
           // document.getElementById("accountId").innerHTML = existingAccount?.accountNumber;
            
             setMyWalletAccount({...walletAccountDetails.data.data[0]})
             
            
           // console.log(walletAccountDetails.data.data[0])
           if('accountNumber' in existingAccount ){
             // console.log("true")
              const myTransactionLedgers = await myTransactions(existingAccount.accountNumber)
              // console.log(myTransactionLedgers)
              setTransactions([...myTransactionLedgers?.data?.data])
              // console.log(transactions)

              //if first timer then 
              //ledger into the user account 
              //the free gift account bonus of 1000.00 USD given to a signed up user
              //THATS ALOT OF BONUS
              if(myTransactionLedgers?.data?.data.length <=0){
                let debitorLedgerDetail = {
                  accountNumber: SIMBA_ACCOUNT_NUMBER,
                  amount:BONUS_AMOUNT,
                  exchangeAmount: 1000.00,
                  rate:1.00,
                  sendingCurrency:"USD",
                  receivingCurrency:"USD",
                  senderId: SIMBA_COMPANY_ID,
                  senderEmail:SIMBA_COMPANY_EMAIL,
                  receipientId: userEmail
                };
                let creditorLedgerDetail ={
                  accountNumber :existingAccount.accountNumber, // THE CREDITING USER ACCOUT
                  amount:BONUS_AMOUNT,
                  rate:1.00,
                  exchangeAmount: 1000.00,
                  sendingCurrency:"USD",
                  receivingCurrency:"USD",
                  senderId: SIMBA_COMPANY_ID,
                  senderEmail:SIMBA_COMPANY_EMAIL,
                  receipientId: userEmail
                }
                await debitLedgerAccount(debitorLedgerDetail)
                await creditLedgerAccount(creditorLedgerDetail)
                const responseLedger = await myTransactions(existingAccount.accountNumber)
                setTransactions([...responseLedger?.data?.data])
                toastedBread({
                  title: 'CONGRATULATIONS FIRSTIMERS',
                  description: "Your wallet account has bee credited with 1000.00 USD. Please wait while transaction is completed.", //error.message,
                  status: 'success',
                  duration: 20000,
                  isClosable: true,
                })
                const tmpTrnx = [...responseLedger?.data?.data];


             walletAccountDetails = await getWalletAccounts(userEmail);
             existingAccount =  walletAccountDetails.data.data[0];
        
             recalculateAtomicBalance(existingAccount)
               setAnimateLoader(false)
              }
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
         setAnimateLoader(false)
         
         
      }catch(error){
         setAnimateLoader(false)
          setIfSomethingWentWrong(true)
        toastedBread({
            title: 'An error occurred.',
            description: error?.message || error, //error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
       
      }
     
   },[])


   // const fetchConversionRates = async (currencyFrom,currencyTo) => {
   //    const result = await fetch(
   //      //8c627c48be6db29a67c2b7cf
   //      //ed66962687fdf4b5a9afb6c6
   //      `https://v6.exchangerate-api.com/v6/8c627c48be6db29a67c2b7cf/pair/${currencyFrom}/${currencyTo}`
   //    );
   //    //console.log(result);
   //    if (result.ok) {
   //      const rates = await result.json();
        
   //      return  rates.conversion_rate
        
   //    }
   //  };
   

    
    
    //console.log(lastTransaction)
    const lastTransaction = transactions[transactions.length -1] ;
    const availableUsersBalance =  lastTransaction?.newBalance
    let bal = []


     
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">


              <Box p={4} >
      <SimpleGrid  bg="#fff" columns={{ base: 1, md: 3 }} spacing={10}>
        <>
        


        <>
        {!animateLoader? (
             <CardBalance
          icon={<Currency code="USD"  size="small" />}
          title={'Balance in USD'}
          text={
            
            !animateLoader? formatCurrency(NEWBALANCE || 0) :( <Loader/>)
          }
        />
          ): (<Loader/>)}
        </>
        </>

        <>
        {!animateLoader? (
             <CardBalance
          icon={<Currency code="NGN"  size="small" />}
          title={'Balance in NGN'}
          text={
            
            !animateLoader? formatCurrency(EQUIVALENT_BALANCE_IN_NGN|| 0) :( <Loader/>)
          }
        />
          ): (<Loader/>)}
        </>

        <>
        {!animateLoader? (
             <CardBalance
          icon={<Currency code="EUR"  size="small" />}
          title={'Balance in Euros'}
          text={
            
            !animateLoader? formatCurrency(EQUIVALENT_BALANCE_IN_EUR|| 0) :( <Loader/>)
          }
        />
          ): (<Loader/>)}
        </>
        
      </SimpleGrid>
    </Box>


      <Stack bg="#fff" direction="row" padding="20px" alignItems="center">
        <Text fontWeight="semibold">Your Transaction </Text>
        <FcLock />
      </Stack>



      
{!animateLoader? (<TransactionTables data={transactions}/>):
  ifSomethingWentWrong ? (<SomethingWentWrong />) :(<Loader/>)}
      

      
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