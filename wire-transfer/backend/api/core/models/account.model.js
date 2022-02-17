import Model from './db/index.db';
class Account extends Model {
  async create(account) {
    try {
      const { rows } = await this.insert('owner, type, balance', '$1, $2, $3', [
        account.owner,
        account.type,
        account.balance,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  /*did this for feature upgrade on the application features usually an admin or staff*/
  async findAll() {
    try {
      const { rows } = await this.select('created_at, accountNumber, owner, type, status, balance');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async findByAccountNumberJoin(id) {
    try {
      const { rows } = await this.selectWithJoin(
        'trans.id, trans.created_at, transactiontype, trans.accountNumber, amount, oldBalance, newBalance, owner',
        'trans.id=$1',
        [id],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async findByAccountNumber(accountNumber) {
    try {
      const { rows } = await this.selectWhere(
        'created_at, accountNumber,owner, type, status, balance',
        'accountNumber=$1',
        [accountNumber],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }



  async findAccountByOwner(id) {
    try {
      const { rows } = await this.selectWhere(
        'created_at, accountNumber, owner, type, status, balance',
        'owner=$1',
        [id],
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(accountNumber, status) {
    try {
      const { rows } = await this.update('status=$1', 'accountNumber=$2', [status, accountNumber]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(accountNumber) {
    try {
      const { rows } = await this.delete('accountNumber=$1', [accountNumber]);
      this.logJSON(rows);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default Account;
