import Model from './db/index.db';
import AccountModel from "./account.model"
import UserModel from "./user.model"
const User = new UserModel("users")
const Account = new AccountModel("accounts")
export default class Transaction extends Model {
  async credit(account, cashierId, amount,exchangeAmount, rate,  receipient, formCurrency='USD', toCurrency='USD') {
   
    try {
        
         const userAccount = account;
         let newBalance = 0.00;
         let newBalanceEuros = 0.00;
          let newBalanceNaira = 0.00;

         const oldBalanceNaira = 0.00;
         const oldBalanceEuros = 0.00;
         

         if(toCurrency=="EUR"){
           // base balance
            newBalance =parseFloat(userAccount.balance) +  parseFloat(exchangeAmount)
            newBalanceEuros = parseFloat(userAccount.balanceEuros)+  parseFloat(exchangeAmount)
         }else if(toCurrency=="NGN"){
           newBalance =parseFloat(userAccount.balance) +  parseFloat(exchangeAmount)
           newBalanceNaira = parseFloat(userAccount.balanceNaira)+  parseFloat(exchangeAmount)
         }else{
            //or + anmount
            newBalance =parseFloat(userAccount.balance) +  parseFloat(exchangeAmount)
         }

          console.log(account, cashierId,amount,receipient)
          const { rows } = await this.insert('accountNumber, senderId, transactionType, amount,exchangeAmount, rate, oldbalance, newbalance, oldBalanceNaira, newBalanceNaira, oldBalanceEuros, newBalanceEuros ,receipientId, formCurrency, toCurrency', '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15', [
          Number(userAccount.accountnumber),
          cashierId, // the user debited  automatically
          'credit',
          amount,
          exchangeAmount, rate,
          userAccount.balance,
          newBalance,
         
        userAccount.balanceNaira,
        newBalanceNaira,
        userAccount.balanceEuros,
        newBalanceEuros ,
          receipient, // the reciever of the money
          formCurrency,
          toCurrency

        ]);
      /*
      *  perform the exchange rates before above
       * To do perform deebit on the other users bank account
      */
         return rows[0];
       
      
    } catch (error) {
      throw error;
    }
  }

  async debit(account, senderId, amount,exchangeAmount, rate,  receipientId,formCurrency='USD', toCurrency='USD') {
    const userAccount = account;
     let    newBalanceNaira = 0.00;  
     let    newBalanceEuros = 0.00;
      let newBalance = 0.00;

     if(toCurrency=="EUR"){
           // base balance
            newBalance =parseFloat(userAccount.balance) -  parseFloat(exchangeAmount)
            newBalanceEuros = parseFloat(userAccount.balanceEuros)-  parseFloat(exchangeAmount)
         }else if(toCurrency=="NGN"){
           newBalance =parseFloat(userAccount.balance) - parseFloat(exchangeAmount) 
           newBalanceNaira = parseFloat(userAccount.balanceNaira)-  parseFloat(exchangeAmount)
         }else{
            //or + anmount
            newBalance =parseFloat(userAccount.balance) -  parseFloat(exchangeAmount) 
         }
     
    try {
      const { rows } = await this.insert('accountNumber, senderId, transactionType, amount,exchangeAmount, rate, oldbalance, newbalance, oldBalanceNaira, newBalanceNaira, oldBalanceEuros, newBalanceEuros ,receipientId, formCurrency, toCurrency', '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15', [
        Number(account.accountnumber),
        senderId, // // the user sending the money
        'debit',
        amount,
        exchangeAmount, rate,
        userAccount.balance,
        newBalance,
         userAccount.balanceNaira,
        newBalanceNaira,
         userAccount.balanceEuros,
        newBalanceEuros ,
         receipientId,
         formCurrency,
         toCurrency
      ]);
      /* Or
      *  perform the exchange rates before above
       * To do perform credit on the other users bank account
      */
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getTransactions(accountNumber) {
    try {

      
     const accountOwner = await  Account.findByAccountNumber(accountNumber)
     console.log(accountOwner)
     const userId = accountOwner.owner;
     const userProfile = await User.findUserById(userId);
     console.log(userProfile)
      
      // const { rows } = await this.selectWhere(
      //   'id, created_at, updated_at, transactiontype, accountNumber, senderId, receipientId, amount,exchangeAmount, rate, oldBalance, newBalance, oldBalanceNaira, newBalanceNaira, oldBalanceEuros, newBalanceEuros, formCurrency,toCurrency',
      //   'accountNumber=$1 '
      //   [accountNumber,userId,userEmail],
      // );

      const { rows } = await this.pool.query('SELECT * FROM transactions WHERE accountNumber=$1 OR  receipientId=$2',[accountNumber,userProfile.email])
      console.log(rows)
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionById(id) {
    try {
      const { rows } = await this.selectWithJoin(
        'trans.id, trans.created_at, transactiontype, trans.updated_at trans.transactiontype, trans.accountNumber, trans.senderId, trans.receipientId, trans.amount, trans.exchangeAmount, trans.rate, trans.oldBalance, trans.newBalance, trans.oldBalanceNaira, trans.newBalanceNaira, trans.oldBalanceEuros, trans.newBalanceEuros, trans.formCurrency,trans.toCurrency',
        'trans.id=$1',
        [id],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}
