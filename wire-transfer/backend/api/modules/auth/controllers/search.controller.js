import ResponseApi from '../../../core/helpers/ResponseApi';
import Utils from "../../../core/helpers/common"
import DB from "../../../core/models/db/index.db"
const response = new ResponseApi();

class SearchController {
 


  static async searchFinder(req, res) {
    
    try{
     //const searchParam  = req.param.name;
//     const user = await UserService.searchFinder();
        const Database = new  DB("users")
     Database.pool.query('SELECT * FROM users', function(error,query,release){
       if(!error){
          /*check if user has the custom application header*/
        console.log(query.rows)
        if (query.rows) {    
          return response.sendSuccess(res, 200, query.rows, 'users found');
        }
        response.sendError(res, 400, 'something went wrong');
        console.log(query.rows)
      }
    })
    } catch (error) {
       console.log(error)
      return response.sendError(res, 401, error.message);
    }
  }

   static async getUser(req, res) {
      let id = req.body;
    if(!isNaN(id)){
        response.sendError(res, 400, 'must be a valid user id number');
    }
   const Database = new  DB("users")
     Database.pool.query(`SELECT * FROM users WHERE id=${id}`, function(error,query,release){
       if(!error){
          /*check if user has the custom application header*/
        console.log(query.rows)
        if (query.rows) {
          return response.sendSuccess(res, 200, query.rows, 'users found');
        }
        response.sendError(res, 400, 'user with this id do not exist');
        console.log(query.rows)
      }
    })
    
      
    } catch (error) {
       console.log(error)
      return response.sendError(res, 401, error.message);
    }

  
}

export default SearchController;
