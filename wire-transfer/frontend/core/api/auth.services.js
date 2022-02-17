/*
*@companyName: Questence
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: Authentication api service
*@params:
*@usage:
*/

/* eslint-disable no-unused-vars */
import axios from "./api_config/axios.config";
import $ from "jquery";
import toast from "react-hot-toast";
/*lms config auth*/
let base_url = "http://gapslmsservices.herokuapp.com"; //process.env.REACT_APP_API_URL2
/*django ajax set up here for post request*/
var contentType = "application/x-www-form-urlencoded"; //"multipart/form-data"
window.drf = {
  csrfHeaderName: "X-CSRFTOKEN",
  csrfToken: "BflbcAqq5u5i8NdzTKBhUZmfFrYXlb1tZwq3EQPrUornyky8l9Vn2AKUJkfHXVR6",
};
/*lms secured safe communication**/
const csrfSafeMethod = (method) => {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
};
const sameOrigin = (url) => {
  // test that a given url is a same-origin URL
  // url could be relative or scheme relative or absolute
  var host = document.location.host; // host + port
  var protocol = document.location.protocol;
  var sr_origin = "//" + host;
  var origin = protocol + sr_origin;

  // Allow absolute or scheme relative URLs to same origin
  return (
    url == origin ||
    url.slice(0, origin.length + 1) == origin + "/" ||
    url == sr_origin ||
    url.slice(0, sr_origin.length + 1) == sr_origin + "/" ||
    // or any other URL that isn't scheme relative or absolute i.e relative.
    !/^(\/\/|http:|https:).*/.test(url)
  );
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

export const emailHelper = async () => {
  let request = axios.get("email/verification/resend");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const loginUserForgotPassword = async (details) => {
  let request = axios.post("/auth/reset-password-request", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const loggedOutUserForgotPassword = async (details) => {
  let request = axios.post("/auth/reset-password-request", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const loginUserForgotChangePassword = async (details) => {
  let request = axios.post("/auth/update-password", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const ChangePassword = async (details) => {
  let request = axios.post("auth/password/reset", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const UpdatePassword = async (details) => {
  let request = axios.post("auth/update-password", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};





export const registerLearner = async (details) => {
  let request = axios.post("learners/register", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const registerInstructor = async (details) => {
  let request = axios.post("instructors/register", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

/*{
  email:"juwavictor@gmail.com",
  password:"password123!@#"
}
*
*/

/*lms api request*/
/*api request: this gives a faster and lesser down time for speed response*/
export const makeRequest = (url, method = "get", details) => {
  switch (method.toLowerCase()) {
    
    case "get":
     //not necessary but good for nework coonection detection
          ///this is the real fetch if network is good
      return fetch(url, {
        method: method.toLowerCase(),
        // credentials: "same-origin",
        headers: {
          // "X-CSRFToken": getCookie("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      
      break;
    default:
      //console.log("calling get");
      return fetch(url, {
        method: method.toLowerCase(),
        // credentials: "same-origin",
        headers: {
          // "X-CSRFToken": getCookie("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      break;
  }
};










