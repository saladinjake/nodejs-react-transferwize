import TransactionModel from '../../models/transaction.model';
import AccountModel from '../../models/account.model';
import UserModel from '../../models/user.model';
import mailer from '../../helpers/mailer';


const Account = new AccountModel('accounts');
const Transaction = new TransactionModel('transactions');
const User = new UserModel('users');


/** service that allows cashier perform transaction of user's account */
class TransactionService {
  
  static async debitAccount(cashierId, accountNumber, amount) {
    try {
      const account = await Account.findByAccountNumber(Number(accountNumber));

      if (account) {
        if (account.status === 'dormant') {
          throw new Error('You can\'t perform a transaction on a dormant account');
        }
        if (account.balance >= amount) {
          const user = await User.findUserById(Number(account.owner));

          const transaction = await Transaction.debit(account, amount, cashierId);

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
      throw error;
    }
  }



  static async creditAccount(cashierId, accountNumber, amount) {
    try {
      const account = await Account.findByAccountNumber(accountNumber);

      if (account) {
        const user = await User.findUserById(Number(account.owner));

        const transaction = await Transaction.credit(account, amount, cashierId);

        const mailData = {
          subject: 'A transaction occured on your account',
          text: 'A credit transaction occured on your TWISER account',
          to: user.email,
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
    } catch (error) {
      throw error;
    }
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
