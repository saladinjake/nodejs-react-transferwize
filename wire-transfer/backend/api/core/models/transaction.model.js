import Model from './db/index.db';
export default class Transaction extends Model {
  async credit(account, cashierId, amount,  receipient, formCurrency='USD', toCurrency='USD') {
   
    try {

         const userAccount = account;
         const newBalance = parseFloat(userAccount.balance) + amount;
         const oldBalanceNaira = 0.00;
         const newBalanceNaira = 0.00;
         const oldBalanceEuros = 0.00;
         const newBalanceEuros = 0.00;

          console.log(account, cashierId,amount,receipient)
          const { rows } = await this.insert('accountNumber, senderId, transactionType, amount, oldbalance, newbalance, oldBalanceNaira, newBalanceNaira, oldBalanceEuros, newBalanceEuros ,receipientId, formCurrency, toCurrency', '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13', [
          Number(userAccount.accountnumber),
          cashierId, // the user debited  automatically
          'credit',
          amount,
          userAccount.balance,
          newBalance,
         
        oldBalanceNaira,
        newBalanceNaira,
        oldBalanceEuros,
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

  async debit(account, senderId, amount,  receipientId,formCurrency='USD', toCurrency='USD') {
    const userAccount = account;
    const newBalance = parseFloat(userAccount.balance) - amount;
    const oldBalanceNaira = 0.00; 
     const    newBalanceNaira = 0.00; 
     const    oldBalanceEuros = 0.00;
     const    newBalanceEuros = 0.00;
     
    try {
      const { rows } = await this.insert('accountNumber, senderId, transactionType, amount, oldbalance, newbalance, oldBalanceNaira, newBalanceNaira, oldBalanceEuros, newBalanceEuros ,receipientId, formCurrency, toCurrency', '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13', [
        Number(account.accountnumber),
        senderId, // // the user sending the money
        'debit',
        amount,
        userAccount.balance,
        newBalance,
        oldBalanceNaira,
        newBalanceNaira,
        oldBalanceEuros,
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
      
      const { rows } = await this.selectWhere(
        'id, created_at, updated_at transactiontype, accountNumber, senderId, receipientId, amount, oldBalance, newBalance, oldBalanceNaira, newBalanceNaira, oldBalanceEuros, newBalanceEuros, formCurrency,toCurrency',
        'accountNumber=$1',
        [accountNumber],
      );

      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionById(id) {
    try {
      const { rows } = await this.selectWithJoin(
        'trans.id, trans.created_at, transactiontype, trans.updated_at trans.transactiontype, trans.accountNumber, trans.senderId, trans.receipientId, trans.amount, trans.oldBalance, trans.newBalance, trans.oldBalanceNaira, trans.newBalanceNaira, trans.oldBalanceEuros, trans.newBalanceEuros, trans.formCurrency,trans.toCurrency',
        'trans.id=$1',
        [id],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}
