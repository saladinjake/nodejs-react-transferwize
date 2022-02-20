/*barrel script to autoload all reducers*/
import { combineReducers } from "redux";

import authReducer from "./auth.reducer";


/*
  *@companyName: SIMBA
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: 
  *@params:
  *@usage:
*/
//barrel reducer as root reducer
export default combineReducers({
  auth: authReducer,
});