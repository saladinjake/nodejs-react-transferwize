import UserService from '../../../core/repositories/services/user.service';
import ResponseApi from '../../../core/helpers/ResponseApi';

const response = new ResponseApi();
class UserController {

  static async signUp(req, res) {
    const user = req.body;
    try {
      const createdUser = await UserService.createUser(user);
      if (createdUser) {
        return response.sendSuccess(res, 201, createdUser, 'Registration was successful');
      }
      return response.sendError(res, 400, 'something went wrong');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }


  static async loginUser(req, res) {
    const login = req.body;
    try {
      const user = await UserService.signUser(login);
      if (user) {
        return response.sendSuccess(res, 200, user, 'Login was successful');
      }
      return response.sendError(res, 400, 'something went wrong');
    } catch (error) {
      return response.sendError(res, 401, error.message);
    }
  }
}

export default UserController;
