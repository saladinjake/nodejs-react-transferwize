import UserService from '../../../core/repositories/services/user.service';
import ResponseApi from '../../../core/helpers/ResponseApi';
import Utils from "../../../core/helpers/common"
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
    let login = req.body;
    try {
      const user = await UserService.signUser(login);

      /*check if user has the custom application header*/
      // console.log(user)
      if (user) {
        
        return response.sendSuccess(res, 200, user, 'Login was successful');
      }
       response.sendError(res, 400, 'something went wrong');
    } catch (error) {
       // console.log(error)
      return response.sendError(res, 401, error.message);
    }
  }

 

  
}

export default UserController;
