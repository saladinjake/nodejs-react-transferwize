import {
  RESET_ERROR,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  SET_PATH,
  SET_LOADING,
} from "./types";

/*
  *@companyName: SIMBA
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: 
  *@params:
  *@usage:
*/
export const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};


/*
  *@companyName: SIMBA
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: 
  *@params:
  *@usage:
*/
export const login = (response) => async (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: response,
  });
};

/*
  *@companyName: SIMBA
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: 
  *@params:
  *@usage:
*/
export const setPrevPath = (path) => async (dispatch) => {
  dispatch({
    type: SET_PATH,
    payload: path,
  });
};

/*
  *@companyName:SIMBA
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: 
  *@params:
  *@usage:
*/
export const resetErrFlag = () => async (dispatch) => {
  dispatch({
    type: RESET_ERROR,
  });
};

/*
  *@companyName: SIMBA
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: 
  *@params:
  *@usage:
*/
export const logOut = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};