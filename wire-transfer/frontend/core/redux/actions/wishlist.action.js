import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, CLEAR_WISHLIST } from "./types";
import $ from "jquery";
// import { getWishlist } from "services/wishlist";

/*
  *@companyName: Questence
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: 
  *@params:
  *@usage:
*/
export const addToWishList = (id) => async (dispatch) => {
  if ($(".wishlister")) {
  
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: id,
    });
  } else {
    //console.log(id + "called to wishlist");

    dispatch({
      type: ADD_TO_WISHLIST,
      payload: id,
    });
  }
};

/*
  *@companyName: Questence
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: 
  *@params:
  *@usage:
*/
export const removeFromWishList = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST,
    payload: id,
  });
};

/*
  *@companyName: Questence
  *@Location : Lagos Nigeria
  *@Author/Developer : juwa victor/saladinjake
  *@AuthorsEmail : juwavictor@gmail.com
  *@description: 
  *@params:
  *@usage:
*/
export const clearWishList = () => async (dispatch) => {
  //console.log("cart cleared action");
  dispatch({
    type: CLEAR_WISHLIST,
  });
};