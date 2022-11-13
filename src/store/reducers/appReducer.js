import { combineReducers } from 'redux';
import * as types from "../actions/types";

const INITIAL_STATE = {
  isLoggedIn: false,
  name: "",
  email: "",
  id: "",
  authToken: ""
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {


    case types.LOGIN: {
    return {
        ...state,
        isLoggedIn: true,
        id: action.data.id,
        name: action.data.name,
        email: action.data.email,
        authToken: action.data.token,
        };
    }

    case types.SIGNUP: {
      return {
          ...state,
          isLoggedIn: true,
          id: action.data.id,
          name: action.data.name,
          email: action.data.email,
          authToken: action.data.token,
          };
      }


    case types.LOGOUT: {
      return {
          ...state,
          isLoggedIn: false
          };
      }


    
    
    

    default:
      return state
  }
};

export default combineReducers({ appReducer })