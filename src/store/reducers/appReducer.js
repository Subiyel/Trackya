import { combineReducers } from 'redux';
import * as types from "../actions/types";

const INITIAL_STATE = {
  isLoggedIn: false,
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {


    case types.LOGOUT: {
    return {
        ...state,
        isLoggedIn: false
        };
    }

    case types.LOGIN: {
    return {
        ...state,
        isLoggedIn: true
        };
    }


    
    
    

    default:
      return state
  }
};

export default combineReducers({ appReducer })