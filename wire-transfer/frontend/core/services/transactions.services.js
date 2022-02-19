import axios from "../config/api_config/axios.config";

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

export const getAllBalanceEquivalent = async (ledgerDetail) => {
	let request = axios.post(`/transactions/${ledgerDetail?.accountNumber}/equibalance`, ledgerDetail);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
}

export const sendMoneyOverseas = async (creditLedgerDetail,debitLedgerDetail) =>{
  const creditorAccount = await getWalletAccounts(creditLedgerDetail.receipientId)
  creditLedgerDetail.accountNumber = creditorAccount.data.data[0].accountNumber
  console.log(creditorAccount)

  const debitorAccount = await getWalletAccounts(debitLedgerDetail.receipientId)
  // debitLedgerDetail.accountNumber = debitorAccount.data.data[0].accountNumber
  
   //await creditLedgerAccount(creditLedgerDetail)
  
   //await debitLedgerAccount(debitLedgerDetail)
}