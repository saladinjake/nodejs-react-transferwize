
import AccountService from '../../../core/repositories/services/account.service';
import ResponseApi from '../../../core/helpers/ResponseApi';

const response = new ResponseApi();

class AccountController {
  
  static async createBankAccount(req, res) {
    const { id } = req.token;
    const { type, balance } = req.body;

    try {
      const account = await AccountService.createAccount(id, type, balance);
      return response.sendSuccess(res, 201, account);
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }
  static async fetchAllAccounts(req, res) {
    const { status } = req.query;

    try {
      if (status && !(['dormant', 'active'].includes(status))) {
        throw new Error('invalid status query');
      }

      const accounts = await AccountService.getAllAccounts();

      if (accounts.length > 0) {
        if (status) {
          const filtered = accounts.find(account => account.status === status);
          if (filtered) {
            return response.sendSuccess(res, 200, [filtered], 'Account was successfully fetched');
          }
          return response.sendSuccess(res, 200, [], 'No account found');
        }
        return response.sendSuccess(res, 200, accounts, 'Account was successfully fetched');
      }
      return response.sendError(res, 204, 'no account has been created');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }


  static async getAccount(req, res) {
    const { accountNumber } = req.params;
    try {
      const data = await AccountService.getAccount(accountNumber);
      return response.sendSuccess(res, 200, data, 'Account was successfully fetched');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }
  static async getAUserAccounts(req, res) {
    const { email } = req.params;
    try {
      const accounts = await AccountService.getAUserAccounts(email);
      if (accounts) {
        return response.sendSuccess(res, 200, accounts, 'Accounts was successfully fetched');
      }
      return response.sendError(res, 400, 'something went wrong');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  
  static async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    try {
      const message = await AccountService.deleteAccount(accountNumber);
      return response.sendSuccess(res, 200, null, message);
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }
}


export default AccountController;
