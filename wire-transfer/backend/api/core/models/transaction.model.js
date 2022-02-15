import Model from './db/index.db';
export default class Transaction extends Model {
  async credit(account, amount, cashierId, receipient) {
    const userAccount = account;
    const newBalance = parseFloat(userAccount.balance) + amount;
    try {
      const { rows } = await this.insert('accountNumber, senderId, transactionType, amount, oldbalance, newbalance,receipientId, created_at', '$1, $2, $3, $4, $5, $6, $7, $8', [
        Number(account.accountnumber),
        cashierId, // the fintech ai transactor responsible for the transaction tobe done automatically
        'credit',
        amount,
        userAccount.balance,
        newBalance,
        account.accountnumber, receipient.accountnumber

      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async debit(account, amount, cashierId, receipient) {
    const userAccount = account;
    const newBalance = parseFloat(userAccount.balance) - amount;

    try {
      const { rows } = await this.insert('accountNumber, senderId, transactionType, amount, oldbalance, newbalance, donor, receipient', '$1, $2, $3, $4, $5, $6, $7, $8', [
        Number(account.accountnumber),
        cashierId, // // the automated fintech ai transactor robot responsible for the transaction tobe done automatically
        'debit',
        amount,
        userAccount.balance,
        newBalance,
        account.accountnumber, receipient.accountnumber
      ]);
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
