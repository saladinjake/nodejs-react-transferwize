import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_ERROR,
  SET_PATH,
  SET_LOADING,
} from "./../actions/types";
import toast from "react-hot-toast"
import { loadInitialState } from '../../helpers/utils/localStorageAPI'

const initialState = loadInitialState()

console.log(initialState)
/*
  *@companyName: SIMBA
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: authentication reducer function
  *@params: @object, @FUNCTION
  *@returns: Object
*/
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      //console.log(action.payload.user)
      if(action.payload.data.data.hasOwnProperty("id") ){
        //more security check befor grants are allowed
            //all this should be encrypted so its not just plain
          if (typeof window !== "undefined") {

            let userPayLoad = {
              email: action.payload.data.data.email,
              firstName: action.payload.data.data.firstName,
              id: action.payload.data.data.id,
              isAdmin: action.payload.data.data.isAdmin,
              lastName: action.payload.data.data.lastName,
              token:action.payload.data.data.token,
              type: action.payload.data.data.type,
              isAuthenticated:true,
            };

            localStorage.setItem("access_token", action.payload.data.data.token);
            localStorage.setItem("user", JSON.stringify(userPayLoad));
            

            localStorage.setItem(
              "user_roles",
              JSON.stringify(action.payload.data.data.isAdmin)
            );
          }
       //toast.success("Login Successful");
      }else{
       toast.error("Login Credentials not found");
       if (typeof window !== "undefined") {
      
         localStorage.clear()
       }
      }
     
      return {
        ...state,
        loading: false,
        user: {...userPayLoad}, // action.payload.user,
        token: action.payload.data.data.token,
        user_roles: action.payload.data.data.isAdmin,
        isAuthenticated: true,
        errFlag: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    if (typeof window !== "undefined") {
      
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_roles");
      window.location.href="/login"
    }
      return {
        ...state,
        token: null,
        loading: false,
        user_roles: null,
        isAuthenticated: false,
        isRegistered: false,
        user: null,
        errFlag: true,
        error: action.payload,
      };
    case SET_PATH:
      return {
        ...state,
        prevPath: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        loading: false,
        errFlag: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};