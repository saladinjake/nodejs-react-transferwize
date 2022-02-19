import AccountModel from '../../models/account.model';
import UserModel from '../../models/user.model';

const User = new UserModel('users');
const Account = new AccountModel('accounts');


/** service that allows user create bank account, delete bank account */
class AccountService {
  
  static async createAccount(userId, type, balance) {
    try {
      const user = await User.findUserById(userId); // check if user already exist

      if (user) {
        const account = await Account.findAccountByOwner(Number(userId));

        if (account.length > 0) {
          if (account.length === 2) {
            throw new Error(`user already have a savings and current accounts - ${account[0].accountnumber} and ${account[1].accountnumber} `);
          }

          if (account[0].type === type) {
            throw new Error(`user already have a ${type} account : ${account[0].accountnumber}`);
          }
        }

        // create a new bank account
        const newAccount = await Account.create({
          owner: userId,
          type,
          balance,
        });

        return {
          accountNumber: newAccount.accountnumber,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          type,
          balance: balance.toFixed(2),
        };
      }
      throw new Error('user doesn\'t exist');
    } catch (error) {
      throw error;
    }
  }

  
  /**
   * @description this function fetches a single user account
   * @param {object} response
   */
  static async getAccount(accountNumber) {
    try {
      const foundAccount = await Account.findByAccountNumber(accountNumber);

      if (foundAccount) {
        const {
          owner, accountnumber, createdon, ...data
        } = foundAccount;

        const user = await User.findUserById(owner);
        return {
          createdOn: createdon,
          accountNumber: Number(accountnumber),
          ownerEmail: user.email,
          ...data,
        };
      }
      throw new Error('account number doesn\'t exist');
    } catch (error) {
      throw error;
    }
  }

  
  /**
   * @description fetches all accounts
   * @param {object} response
   */
  static async deleteAccount(accountNumber) {
    try {
      const foundAccount = await Account.findByAccountNumber(Number(accountNumber));

      if (foundAccount) {
        const isDeleted = await Account.deleteAccount(Number(accountNumber));

        if (isDeleted) {
          return 'Account successfully deleted';
        }
      }
      throw new Error('account number doesn\'t exist');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description this function checks if an account belongs to a user
   * @param {object} response
   */
  static async isMyAccount(id, accountNumber) {
    try {
      const foundAccount = await Account.findByAccountNumber(accountNumber);

      if (foundAccount) {
        if (Number(foundAccount.owner) !== Number(id)) {
          return false;
        }
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description this function get all account owned by specific user
   * @param {string} email address of a user
   */

  static async getAUserAccounts(email) {
    try {
      const user = await User.findUserByEmail(email);
      if (user && "id" in user) {
        const accounts = await Account.findAccountByOwner(user.id);

        if(accounts.length> 0 && 'accountnumber' in accounts[0]){
          return accounts.map((account) => {
                 const {
                  created_at, accountnumber, owner, ...data
                } = account;

                return {
                  created_at: created_at,
                  accountNumber: accountnumber,
                  ...data,
                };
           });
        }else if(accounts.length<= 0 && user && "id" in user){
           //user exists but no account so create user account
           await AccountService.createAccount(user.id, "savings", 1000.00);

           const accounts = await Account.findAccountByOwner(user.id);

           if(accounts.length> 0 && 'accountnumber' in accounts[0]){
              return accounts.map((account) => {
              const {
                created_at, accountnumber, owner, ...data
              } = account;
              return {
                created_at: created_at,
                accountNumber: accountnumber,
                ...data,
              };
            });
           }
        }   
      }
        throw new Error('user with this email address not found');
    } catch (error) {
      throw error;
    }
  }
}


export default AccountService;
