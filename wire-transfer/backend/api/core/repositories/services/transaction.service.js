import TransactionModel from '../../models/transaction.model';
import AccountModel from '../../models/account.model';
import UserModel from '../../models/user.model';
import mailer from '../../helpers/mailer';
import dotenv from "dotenv"
dotenv.config()

const Account = new AccountModel('accounts');
const Transaction = new TransactionModel('transactions');
const User = new UserModel('users');


/** service that allows cashier perform transaction of user's account */
class TransactionService {
  
  static async debitAccount( accountNumber,senderId, amount, exchangeAmount, rate, receipientId,formCurrency,toCurrency)  {
    try {
      const account = await Account.findByAccountNumber(Number(accountNumber));
      //console.log(account)
      if (account) {
        if (account.status === 'dormant') {
          throw new Error('You can\'t perform a transaction on a dormant account');
        }
        if (account.balance >= amount) {
          const user = await User.findUserById(Number(account.owner));

          const transaction = await Transaction.debit(
            account,senderId, amount,exchangeAmount, rate,
             receipientId,formCurrency,toCurrency      
             );

          const mailData = {
            subject: 'A transaction occured on your account',
            text: 'A debit transaction occured on your TWISER account',
            to: user.email,
            html: `<div style="background:#f6f6f6;border:2px solid #eee;box-shadow: 5px 10px #888888;padding:10px; width:500px;height:300px;background:#fff;color:#000;font-size:17px;margin:0px auto;justify-content:center">
            <h3>Hi ${user.firstname+ " " + user.lastname}</h3><br/>
              <h4>A debit transaction occured on your TWISER account</h4>
             <b>Amount: ${amount}<br/><br/>
              Transaction type: debit<br/><br/>
              Account Balance: ${transaction.newbalance}<br/><br/>
              Visit <a href='https://transferwise-apitest.herokuapp.com/'>TWISER App</a> today</b></div>`,
          };

          await mailer(mailData);

          return {
            transactionId: transaction.id,
            accountNumber: Number(transaction.accountnumber),
            amount,
            exchangeAmount, rate,
            cashier: transaction.senderid,
            transactionType: transaction.transactiontype,
            accountBalance: transaction.newbalance,
            formCurrency: transaction.formcurrency,
            toCurrency: transaction.tocurrency,
            balanceNaira: transaction.newbalancenaira,
            balanceEuros: transaction.newbalanceeuros
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



  static async creditAccount( accountNumber/*creditor acc*/,senderId/*creditor id*/, amount,exchangeAmount, rate, receipientId/*reciever email*/, formCurrency,toCurrency) {
    try {

       const account = await Account.findByAccountNumber(Number(accountNumber));
      //console.log(account)
      if (account) {

      const recieverDetail = await User.findUserByEmail(receipientId);

      //console.log(recieverDetail)
      const recieverAccount = await  Account.findAccountByOwner(parseInt(recieverDetail.id))
     
      if (Array.isArray(recieverAccount) ){
       
         const transaction = await Transaction.credit(recieverAccount[0], senderId, amount,exchangeAmount, rate, receipientId,formCurrency,toCurrency);
        
        const mailData = {
          subject: 'A transaction occured on your account',
          text: 'A credit transaction occured on your TWISER account',
          to: recieverDetail.email,
          html: `<div style="background:#f6f6f6;border:2px solid #eee;box-shadow: 5px 10px #888888;padding:10px; width:500px;height:300px;background:#fff;color:#000;font-size:17px;margin:0px auto;justify-content:center">
           <h3>Hi ${recieverAccount.firstname+ " " + recieverAccount.lastname}</h3><br/>
           <b>Amount: ${amount}<br/><br/>
            Transaction type: credit<br/><br/>
            Account Balance: ${transaction.newbalance}<br/><br/>
            Visit <a href='https://transferwise-apitest.com/'>TWISER App</a> today</b></div>`,
        };

        await mailer(mailData);

        return {
            transactionId: transaction.id,
            accountNumber: Number(transaction.accountnumber),
            amount,
            exchangeAmount, rate,
            cashier: transaction.senderid,
            transactionType: transaction.transactiontype,
            accountBalance: transaction.newbalance,
            formCurrency: transaction.formcurrency,
            toCurrency: transaction.tocurrency,
            balanceNaira: transaction.newbalancenaira,
            balanceEuros: transaction.newbalanceeuros
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

  atmTransferTransaction(accountNumber,senderId, amount,receipientId){
    /*this is where debit and credit of the user is done*/
    const atmTransactionDebit = this.debitAccount(accountNumber,senderId, amount,receipientId)
    if(this.successfulTransaction(atmTransactionDebit)){
      const atmTransactionCredit = this.creditAccount(accountNumber,senderId, amount,receipientId)
      if(this.successfulTransaction(atmTransactionCredit)){
        return {
          debitLedger:atmTransactionDebit,
          creditLedger: atmTransactionCredit
        }
      }else{
        //reverse payment already made by the sender
        // this.creditAccount()
      }
    } else{
      throw new Error('ATM OUT OF SERVICE.. TRY AGAIN LATER')
    }
  }


  static async getAllTransactions(accountNumber) {
    try {
      const foundAccount = await Account.findByAccountNumber(accountNumber);

      if (foundAccount) {
        const transactions = await Transaction.getTransactions(Number(foundAccount.accountnumber));

        return transactions.map((transaction) => {
          const {
            id, transactiontype, accountnumber, created_at, oldbalance, newbalance, ...data
          } = transaction;

          return {
            transactionId: id,
            createdOn: created_at,
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
          id, transactiontype, accountnumber, created_at, oldbalance, newbalance, ...data
        } = transaction;

        return {
          transactionId: id,
          createdOn: created_at,
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
