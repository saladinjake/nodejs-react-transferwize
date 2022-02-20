import axios from "../config/api_config/axios.config";
import toast from "react-hot-toast"
export const myTransactions = async (accountNumber) => {
  let request = axios.get(`accounts/${accountNumber}/transactions`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
export const getWalletAccounts = async (emailId) => {
  let request = axios.get(`user/${emailId}/accounts`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
export const creditLedgerAccount = async (ledgerDetail) => {
 let request = axios.post(`/transactions/${ledgerDetail?.accountNumber}/credit`, ledgerDetail);  
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
}
export const debitLedgerAccount = async (ledgerDetail) => {
	let request = axios.post(`/transactions/${ledgerDetail?.accountNumber}/debit`, ledgerDetail);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
}


export const sendMoneyOverseas = async (creditLedgerDetail,debitLedgerDetail) =>{
   // console.log(creditLedgerDetail)
   // console.log(debitLedgerDetail)
  try{
    const creditorAccount = await getWalletAccounts(creditLedgerDetail.receipientId)
    creditLedgerDetail.accountNumber = creditorAccount.data.data[0].accountNumber
    const debitorAccount = await getWalletAccounts(debitLedgerDetail.receipientId)
    debitLedgerDetail.accountNumber = debitorAccount.data.data[0].accountNumber

   // console.log( debitLedgerDetail,creditLedgerDetail)
   const presignedSignatureCredit = await creditLedgerAccount(creditLedgerDetail)
   console.log(presignedSignatureCredit)
   const presignedSignatureDebit = await debitLedgerAccount(debitLedgerDetail)
    console.log(presignedSignatureDebit)
    // if(presignedSignatureCredit ){ //if credit was successful
    //   if(presignedSignatureDebit){ // if debit was successful

    //   }else{
        
    //      //else reverse credit
    //       toast.error("Transaction could not complete. Dont worry we will reverse any transaction that has been debited or credited with out properly derived state.")
    //   }
      
    // }else{
    //    toast.error("Transaction could not be completed. Please contact your bank manager next year!!!") 
    // }
  }catch(error){
    // roll back transaction
    toast.error(error.message|| error)
    console.log(error)
     console.log("INOPERATIVE SWITCH OR ACCOUNT")
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
    console.log("INOPERATIVE SWITCH OR ACCOUNT")
  }
}