/*setup react redux questence store*/
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";  ///thunk alone cant persist redux state after reload 
import logger from 'redux-logger';
import rootReducer from "./reducers";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
 //persist the state
const initialState = {};
const middlewareArr = [thunk,logger];
/*
  *@companyName: SIMBA
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: redux state management store house
  *@params:
  *@usage:
*/
const QReduxStore= createStore(rootReducer,
   initialState, 
   //middleware
  composeWithDevTools(applyMiddleware(...middlewareArr))
);
export default QReduxStore;