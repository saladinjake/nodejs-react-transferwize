
import TransactionService from '../../../core/repositories/services/transaction.service';
import ResponseApi from '../../../core/helpers/ResponseApi';

const response = new ResponseApi();

class TransactionController {
 
  static async debitUserAccount(req, res) {
    const { amount , receipientId} = req.body;
    const emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if (!emailFilter.test(receipientId)) {
     
        return response.sendError(res, 400, "receipientId must be a valid email");
    }
  else
  {
    const  id = req?.token?.id;
    const { accountNumber } = req.params;
    console.log(id,accountNumber,amount , receipientId)
  
    try {    
        const transaction = await TransactionService.debitAccount( accountNumber,id, amount, receipientId);
        return response.sendSuccess(res, 200, transaction, 'Transaction was successful');
    
    } catch (error) {
      // console.log(error)
      return response.sendError(res, 400, error.message|| error);
    }

   }
  }


  static async creditUserAccount(req, res) {

      const { amount , receipientId} = req.body;
    const emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if (!emailFilter.test(receipientId)) {
     
        return response.sendError(res, 400, "receipientId must be a valid email");
    }
  else
  {
    const  id = req?.token?.id;
    const { accountNumber } = req.params;    
    try {
      const transaction = await TransactionService.creditAccount( accountNumber,id, amount, receipientId);
      return response.sendSuccess(res, 200, transaction, 'Transaction was successful');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }

   }
  }

  static async getTransactions(req, res) {
    const { accountNumber } = req.params;
    try {
      const data = await TransactionService.getAllTransactions(accountNumber);
      return response.sendSuccess(res, 200, data, 'Transactions was successfully fetched');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

 
  static async getATransaction(req, res) {
    const { transactionId } = req.params;
    try {
      const data = await TransactionService.getTransaction(transactionId);
      return response.sendSuccess(res, 200, data, 'Transaction was successfully fetched');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }
}

export default TransactionController;
