
import TransactionService from '../../../core/repositories/services/transaction.service';
import ResponseApi from '../../../core/helpers/ResponseApi';

const response = new ResponseApi();

class TransactionController {
 
  static async debitUserAccount(req, res) {
    let formCurrency = null; let toCurrency = null
    const { amount , rate, senderId, senderEmail, exchangeAmount, receipientId, sendingCurrency, receivingCurrency } = req.body;
    
    const emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if (!emailFilter.test(receipientId)) {
     
        return response.sendError(res, 400, "receipientId must be a valid email");
    }
  else
  {
   const  id = req.senderId || req?.token?.id; // the person performing the trasfer
    const { accountNumber } = req.params;   // the same persons identity wallet 
    
    try {    
        const transaction = await TransactionService.debitAccount( 
          accountNumber,senderId,senderEmail, amount, req.body.exchangeAmount, req.body.rate,
           receipientId,sendingCurrency, receivingCurrency
        );
        return response.sendSuccess(res, 200, transaction, 'Transaction was successful');
    } catch (error) {
      // console.log(error)
      return response.sendError(res, 400, error.message|| error);
    }

   }
  }


  static async creditUserAccount(req, res) {
   let formCurrency = null; let toCurrency = null
    const { amount ,senderId, senderEmail, rate, exchangeAmount, receipientId, sendingCurrency, receivingCurrency } = req.body;
   
    const emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if (!emailFilter.test(receipientId)) {
     
        return response.sendError(res, 400, "receipientId must be a valid email");
    }
  else
  {
    const  id = req.senderId || req?.token?.id; // the person receiving or who's ledger is credited the trasfer
    const { accountNumber } = req.params;   // the same credited persons identity wallet 
    
    try {
      let formCurrency = sendingCurrency;
      let toCurrency = receivingCurrency;
      const transaction = await TransactionService.creditAccount(
       accountNumber,senderId, senderEmail, amount,req.body.exchangeAmount, req.body.rate,
        receipientId,formCurrency, toCurrency
      );
      console.log(transaction)
      return response.sendSuccess(res, 200, transaction, 'Transaction was successful');
    } catch (error) {
      console.log(error)
      return response.sendError(res, 400, error.message);
    }

   }
  }

  static async getTransactions(req, res) {
    const { accountNumber } = req.params;
     const  id = req?.token?.id; // the person receiving or who's ledger is credited the trasfer
     const  {email } =  req?.token; // the person performing the trasfer
      console.log(req.token)
    try {
      const data = await TransactionService.getAllTransactions(accountNumber);
      return response.sendSuccess(res, 200, data, 'Transactions was successfully fetched');
    } catch (error) {
         console.log(error)
      return response.sendError(res, 400, error.message);
    }
  }

 
  static async getATransaction(req, res) {
     const { transactionId } = req.params;
     // const  id = req.token.id; // the person receiving or who's ledger is credited the trasfer
     // const  email  =  req.token.email; // the person performing the trasfer
     //  console.log(req.token)
    try {
      const data = await TransactionService.getTransaction(transactionId);
      return response.sendSuccess(res, 200, data, 'Transaction was successfully fetched');
    } catch (error) {
         console.log(error)
      return response.sendError(res, 400, error.message);
    }
  }
}

export default TransactionController;
