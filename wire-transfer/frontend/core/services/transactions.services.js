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