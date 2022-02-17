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

/*lms config auth*/
let base_url = "transferwise-apitest.herokuapp.com"; //process.env.REACT_APP_API_URL2
/*django ajax set up here for post request*/
var contentType = "application/json"; //"multipart/form-data"
window.drf = {
  csrfHeaderName: "X-CSRFTOKEN",
  csrfToken: "BflbcAqq5u5i8NdzTKBhUZmfFrYXlb1tZwq3EQPrUornyky8l9Vn2AKUJkfHXVR6",
};
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
