import axios from "../config/api_config/axios.config";
import toast from "react-hot-toast"
export const myTransactions = async (accountNumber) => {
  let request = axios.get(`accounts/${accountNumber}/transactions`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  })//.catch(err=> toast.error(err.message || err.toString()));
};
export const getWalletAccounts = async (emailId) => {
  let request = axios.get(`user/${emailId}/accounts`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  })//.catch(err=> toast.error(err.message || err.toString()));
};

export const getUserProfileById = async (Id) => {
  let request = axios.get(`search/${Id}/users`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  })//.catch(err=> toast.error(err.message || err.toString()));
};
export const creditLedgerAccount = async (ledgerDetail) => {
 let request = axios.post(`/transactions/${ledgerDetail?.accountNumber}/credit`, ledgerDetail);  
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  })//.catch(err=> toast.error(err.message || err.toString()));
}
export const debitLedgerAccount = async (ledgerDetail) => {
	let request = axios.post(`/transactions/${ledgerDetail?.accountNumber}/debit`, ledgerDetail);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  })//.catch(err=> toast.error(err.message || err.toString()));
}


export const fetchConversionRates = async (currencyFrom,currencyTo) => {
      const result = await fetch(//
        //8c627c48be6db29a67c2b7cf
        `https://v6.exchangerate-api.com/v6/ed66962687fdf4b5a9afb6c6/pair/${currencyFrom}/${currencyTo}`
      );
      //console.log(result);
      if (result.ok) {
        const rates = await result.json();
        return rates.conversion_rate;
        
      }
    };

export const sendMoneyOverseas = async (creditLedgerDetail,debitLedgerDetail) =>{
   // console.log(creditLedgerDetail)
   // console.log(debitLedgerDetail)
  try{
    //credit the reciever debit the giver
    const creditorAccount = await getWalletAccounts(creditLedgerDetail.receipientId)
    creditLedgerDetail.accountNumber = creditorAccount.data.data[0].accountNumber
    const debitorAccount = await getWalletAccounts(debitLedgerDetail.senderEmail)
    debitLedgerDetail.accountNumber = debitorAccount.data.data[0].accountNumber

   // console.log( debitLedgerDetail,creditLedgerDetail)
   const presignedSignatureCredit = await creditLedgerAccount(creditLedgerDetail)
   console.log(presignedSignatureCredit)
   const presignedSignatureDebit = await debitLedgerAccount(debitLedgerDetail)
   console.log(presignedSignatureDebit)
   if(presignedSignatureCredit.status==200 ){ //if credit was successful
     if(presignedSignatureDebit.status==200){ // if debit was successful
          return "OK"
      }else{
        try{
         //else reverse credit made...
         const senderAccount = await getWalletAccounts(creditLedgerDetail.senderEmail)
         creditLedgerDetail.accountNumber = senderAccount.data.data[0].accountNumber
         const presignedSignatureCredit = await creditLedgerAccount(creditLedgerDetail)
         const receiverAccount = await getWalletAccounts(debitLedgerDetail.receipientId)
         debitLedgerDetail.accountNumber = receiverAccount.data.data[0].accountNumber
         const presignedSignatureDebit = await debitLedgerAccount(debitLedgerDetail)
    
         setTimeout(()=>{
            if(presignedSignatureCredit.status==200 && presignedSignatureDebit.status==200){
               toast.success("Your money was reversed back")
            }else{
              toast.error("Contact us at SIMBA if you dont receive your money. we are generous people!")
            }
         },1000)

        }catch(error){
          //else reverse credit
           toast.error("Transaction could not complete. Dont worry we will reverse any transaction that has been debited or credited with out properly derived state.")
           return 'FAILED'
        }    
         
      }
      
   }else{
       toast.error("Transaction could not be completed. Please contact your bank manager next year!!!") 
        return 'FAILED'
    }
  }catch(error){
    // roll back transaction
    toast.error(error.message|| error)
    console.log(error)
     console.log("INOPERATIVE SWITCH OR ACCOUNT")
      return 'FAILED'
 }
}




export const reverseMoneyTransfered = async (creditLedgerDetail,debitLedgerDetail) => {
  try{
    const creditorAccount = await getWalletAccounts(creditLedgerDetail.receipientId)
    creditLedgerDetail.accountNumber = creditorAccount.data.data[0].accountNumber
    const debitorAccount = await getWalletAccounts(debitLedgerDetail.receipientId)
    debitLedgerDetail.accountNumber = debitorAccount.data.data[0].accountNumber
    await creditLedgerAccount(debitLedgerDetail)
    await debitLedgerAccount(creditLedgerDetail)
  
  }catch(error){
    console.log("SERVICE DOWN TIME.. WE ARE WORKING TO SERVE YOU BETTER")
  }
}




export const deriveForeignExchangeAccountBalance = async (FROM="USD",TO='USD',AMOUNT=1) =>{

      const currency_one = FROM;
      const currency_two = TO;

      try{
        let request = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        if (!request.ok) {
             throw new Error(`HTTP error! status: ${request.status}`);
        }
        let data = await request.json()
        let rate = data.rates[currency_two];
        return  (AMOUNT * rate).toFixed(2)

      }catch(err){
        console.log("Service down")
      }
      
  
  
  }


/*
*@usage await userCannotProceedToPayment({
*  balance:4,000, //YOUR base balance in USD
*  "EUR", // WHAT CURRENCY ARE WE TO TRANSFER TO USER
*  50,000, //HOW MUCH TO SEND BUT WAIT!!!
             HOW CAN YOU THEN SPEND EUR50,000 
*        // WHEN U HAVE ONLY JUST USD4,000  
*   // THIS IS WHY THIS AI IMPLEMENTATION WAS DONE FOR FINTECH SOLUTION
}) 
*@returns boolean
*/
export const userCannotProceedToPayment = async (myWalletDetails, fromCurrency,AmountToSend) =>{
  //todo: validate wallet existence: we are dealing with money here
  // no loose ends.. validate that the user is in our db
    /*this is an expensive function */
    /*it should only run if user is permitted*/
  let disableTransaction = true;
  let resultingUserBalance =false;
  let deductionValue = 0.00
  const loggedInUsersWallet = myWalletDetails;
  let accountBalanceInUSD = loggedInUsersWallet.balance // ALWAYS IN USD AS BASE CURRENCY
  const allowedTradingCurrencies = ["USD","NGN",'EUR'];
  // USERS ACCOUNT BALANCE IN DIFFERENT CURRENCIES
  const keyValuePairBalance = {
          "USD":0.00  ,
          "EUR":0.00 ,
          "NGN":0.00 ,
  }
  if(allowedTradingCurrencies.includes(fromCurrency)){    
        //you can transact
    //FIND ALL pair balance of the amount to send
    await deriveForeignExchangeAccountBalance(
       "USD","USD",
      accountBalanceInUSD) // SAME AS MY OWN BASE BALANCE
    .then(USD=>   keyValuePairBalance["USD"]=USD)
    await deriveForeignExchangeAccountBalance(
      "USD" ,"EUR",
      accountBalanceInUSD)//1000 USD =>839.00
    .then(EUR=> keyValuePairBalance["EUR"]=EUR)
    await deriveForeignExchangeAccountBalance(
      "USD","NGN",
      accountBalanceInUSD) 
      .then(NGN=> keyValuePairBalance["NGN"]=NGN)// SO SAD: 4,...,..000
      //CODE SWEETNESS...
       console.log(keyValuePairBalance)
      // SINCE AMOUNT TO SEND CAN BE ANY CURRENCY WE CHECK IF OUR 
      //BASE BALANCE CAN BE SUFFICIENT ENOUGH TO TRANSACT IF NOT JUST BAIL
      //YOU CANT SPEND WHAT YOU DONT HAVE
      //ITS A BANKING RULE OF LAW... MAYBE AM JUST SAYING!!!!

      //get the equivalent exchange value


      let exchangeAccountBalance = keyValuePairBalance[fromCurrency]
       if(exchangeAccountBalance > AmountToSend){ // NOW WE ARE IN SYNC WITH ONE CURRENCY VALUE 
          disableTransaction = false;
          resultingUserBalance =keyValuePairBalance;

          //TURN ON THE LIGHTS SPARKS AND BLOW!!
          //DEBIT ON THE USER IS POSSIBLE
          return {disableTransaction,resultingUserBalance}
       }else{
        disableTransaction = true;
        resultingUserBalance = false;
        //you can't transact so sorry man.. you dont have money
        /// what did you do with the bonus given to you by simba
        //just asking????...........
         return {disableTransaction,resultingUserBalance}
       }
    }else{
        disableTransaction = true; resultingUserBalance = false;
      //you cant transact any other currency
      //we roll with the big guys US DOLLSSSS....... AND POUNDSSSSSS..
      return {disableTransaction,resultingUserBalance}
    }
    //AI DECISION MAKER RETURNS VALUE
 return {disableTransaction,resultingUserBalance}
}
