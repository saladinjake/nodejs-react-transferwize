export const get = (key) => {
  let data;
  if (typeof window !== "undefined") {
    data = window.localStorage.getItem(key);
    data = data && JSON.parse(data);
  }

  return data;
};

export const set = (key, data) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
};

export const del = (key) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};




export const loadInitialState = () =>{
  if (typeof window !== "undefined") {
  const localStorage =window.localStorage
  const cachedUser = window.localStorage && JSON?.parse(localStorage.getItem("user"));
  const cachedRole =
    localStorage && JSON?.parse(localStorage.getItem("user_roles"));
  const cachedToken = localStorage && localStorage.getItem("token");
  const cachedAuthorization = localStorage.user && localStorage.token;

  const initialState = {
    isAuthenticated: cachedAuthorization ? true : false,
    user: cachedUser ? cachedUser : null,
    token: cachedToken ? cachedToken : null,
    user_roles: cachedRole ? cachedRole : null,
    error: null,
    loading: false,
    errFlag: false,
    prevPath: "",
  };

  return initialState
 }else{
   return {
    isAuthenticated:  false,
    user:  null,
    token:  null,
    user_roles: null,
    error: null,
    loading: false,
    errFlag: false,
    prevPath: "",
  }; 
 }
}