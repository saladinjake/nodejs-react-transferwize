import Model from './db/index.db';
export default class Transaction extends Model {
  async credit(account, cashierId, amount,  receipient) {

   
    try {

     
         const userAccount = account;
         const newBalance = parseFloat(userAccount.balance) + amount;
          console.log(account, cashierId,amount,receipient)
          const { rows } = await this.insert('accountNumber, senderId, transactionType, amount, oldbalance, newbalance,receipientId', '$1, $2, $3, $4, $5, $6, $7', [
          Number(userAccount.accountnumber),
          cashierId, // the user debited  automatically
          'credit',
          amount,
          userAccount.balance,
          newBalance,
          receipient // the reciever of the money

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

  async debit(account, senderId, amount,  receipientId) {
    const userAccount = account;
    const newBalance = parseFloat(userAccount.balance) - amount;
     console.log(Number(account.accountnumber),
        senderId, // // the user sending the money
        'debit',
        amount,
        userAccount.balance,
        newBalance,
         receipientId)
    try {
      const { rows } = await this.insert('accountNumber, senderId, transactionType, amount, oldbalance, newbalance, receipientId', '$1, $2, $3, $4, $5, $6, $7', [
        Number(account.accountnumber),
        senderId, // // the user sending the money
        'debit',
        amount,
        userAccount.balance,
        newBalance,
         receipientId
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
        'id, created_at, transactiontype, accountNumber, amount, oldBalance, newBalance',
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
        'trans.id, trans.created_at, transactiontype, trans.accountNumber, amount, oldBalance, newBalance, owner,receipientId',
        'trans.id=$1',
        [id],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}
