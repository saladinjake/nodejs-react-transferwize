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
import toast from "react-hot-toast"
let base_url = "https://transferwise-apitest.herokuapp.com/api/v1/"; //process.env.REACT_APP_API_URL2
var contentType = "application/json"; //"multipart/form-data"

/*lms secured safe communication**/
const csrfSafeMethod = (method) => {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

export const loginUser = async (details) => {
  let request = axios.post("auth/signin", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  })//.catch(err=> { console.log(err) ; toast.error(err.message || err.toString()) });
};


export const registerUser = async (details) => {
  let request = axios.post("auth/signup", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  })
};



export const searchUser = () => {
  let request = axios.get(`search`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  })//.catch(err=> toast.error(err.message || err.toString()));
}




export const getUser = (id) => {
  let request = axios.get(`search/find/${id}/users`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  })//.catch(err=> toast.error(err.message || err.toString()));
}