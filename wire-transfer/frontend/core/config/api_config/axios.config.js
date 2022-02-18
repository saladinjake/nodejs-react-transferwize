/*
*@companyName: SIMBA
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: Axios configurations
*@params:
*@usage:
*/
import axios from "axios";
let baseURL =  "https://transferwise-apitest.herokuapp.com/api/v1/";
let token;
axios.defaults.headers.common["Content-Type"] ="application/x-www-form-urlencoded";
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//axios.defaults.headers.common['Access-Control-Allow-Origin']= "*"; //less secured
//axios.defaults.headers.common['Access-Control-Allow-Methods']= 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
const instance = axios.create({
  baseURL,
});
instance.interceptors.request.use(
  function (config) {
    token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;