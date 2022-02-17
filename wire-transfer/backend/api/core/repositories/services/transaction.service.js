import TransactionModel from '../../models/transaction.model';
import AccountModel from '../../models/account.model';
import UserModel from '../../models/user.model';
import mailer from '../../helpers/mailer';


const Account = new AccountModel('accounts');
const Transaction = new TransactionModel('transactions');
const User = new UserModel('users');


/** service that allows cashier perform transaction of user's account */
class TransactionService {
  
  static async debitAccount( accountNumber,senderId, amount,receipientId)  {
    try {
      const account = await Account.findByAccountNumber(Number(accountNumber));
      //console.log(account)
      if (account) {
        if (account.status === 'dormant') {
          throw new Error('You can\'t perform a transaction on a dormant account');
        }
        if (account.balance >= amount) {
          const user = await User.findUserById(Number(account.owner));

          const transaction = await Transaction.debit(account,senderId, amount,receipientId);

          const mailData = {
            subject: 'A transaction occured on your account',
            text: 'A debit transaction occured on your TWISER account',
            to: user.email,
            html: `<b>Amount: ${amount}<br/><br/>
              Transaction type: debit<br/><br/>
              Account Balance: ${transaction.newbalance}<br/><br/>
              Visit <a href='https://transferwise-apitest.herokuapp.com/'>TWISER App</a> today</b>`,
          };

          await mailer(mailData);

          return {
            transactionId: transaction.id,
            accountNumber: Number(transaction.accountnumber),
            amount,
            cashier: transaction.cashier,
            transactionType: transaction.transactiontype,
            accountBalance: transaction.newbalance,
          };
        }
        throw new Error('account balance is not sufficient');
      }
      throw new Error('account number doesn\'t exist');
    } catch (error) {
      console.log(error)
      throw error;
    }
  }



  static async creditAccount( accountNumber/*creditor acc*/,senderId/*creditor id*/, amount, receipientId/*reciever email*/) {
    try {

       const account = await Account.findByAccountNumber(Number(accountNumber));
      //console.log(account)
      if (account) {

      const recieverDetail = await User.findUserByEmail(receipientId);

      //console.log(recieverDetail)
      const recieverAccount = await  Account.findAccountByOwner(parseInt(recieverDetail.id))
     
      if (Array.isArray(recieverAccount) ){
       
         const transaction = await Transaction.credit(recieverAccount[0], senderId, amount, receipientId);
        
        const mailData = {
          subject: 'A transaction occured on your account',
          text: 'A credit transaction occured on your TWISER account',
          to: recieverDetail.email,
          html: `<b>Amount: ${amount}<br/><br/>
            Transaction type: credit<br/><br/>
            Account Balance: ${transaction.newbalance}<br/><br/>
            Visit <a href='https://transferwise-apitest.com/'>TWISER App</a> today</b>`,
        };

        await mailer(mailData);

        return {
          transactionId: transaction.id,
          accountNumber: Number(transaction.accountnumber),
          amount,
          cashier: transaction.cashier,
          transactionType: transaction.transactiontype,
          accountBalance: transaction.newbalance,
        };
      }
        throw new Error('account number doesn\'t exist');
    }
    throw new Error('account number doesn\'t exist');
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  concurrencyTransaction(accountNumber,senderId, amount,receipientId){

  }


  static async getAllTransactions(accountNumber) {
    try {
      const foundAccount = await Account.findByAccountNumber(accountNumber);

      if (foundAccount) {
        const transactions = await Transaction.getTransactions(Number(foundAccount.accountnumber));

        return transactions.map((transaction) => {
          const {
            id, transactiontype, accountnumber, createdon, oldbalance, newbalance, ...data
          } = transaction;

          return {
            transactionId: id,
            createdOn: createdon,
            type: transactiontype,
            accountNumber: accountnumber,
            ...data,
            oldBalance: oldbalance,
            newBalance: newbalance,
          };
        });
      }
      throw new Error('account number doesn\'t exist');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description this function fetches a single user transaction
   * @param {object} response
   */
  static async getTransaction(transactionId) {
    try {
      const transaction = await Transaction.getTransactionById(transactionId);

      if (transaction) {
        const {
          id, transactiontype, accountnumber, createdon, oldbalance, newbalance, ...data
        } = transaction;

        return {
          transactionId: id,
          createdOn: createdon,
          type: transactiontype,
          accountNumber: accountnumber,
          ...data,
          oldBalance: oldbalance,
          newBalance: newbalance,
        };
      }
      throw new Error('transaction id doesn\'t exist');
    } catch (error) {
      throw error;
    }
  }
}
export default TransactionService;
