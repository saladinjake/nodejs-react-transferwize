/*
*@companyName: 
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: Authentication api service
*@params:
*@usage:
*/

/* eslint-disable no-unused-vars */
import axios from "../config/api_config/axios.config";
let base_url = "https://transferwise-apitest.herokuapp.com/api/v1/"; //process.env.REACT_APP_API_URL2
var contentType = "application/json"; //"multipart/form-data"

/*lms secured safe communication**/
const csrfSafeMethod = (method) => {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
};
/*enrollment api*/
export const loginUser = async (details) => {
  let request = axios.post("auth/login", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const registerUser = async (details) => {
  let request = axios.post("auth/signup", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const searchUser = (input) => {

  let request = axios.get(`search/users?q=${input}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
   
}