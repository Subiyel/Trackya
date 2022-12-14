import { combineReducers } from 'redux';
import * as types from "../actions/types";

const INITIAL_STATE = {
  isLoggedIn: false,
  name: "",
  email: "",
  id: "",
  authToken: "",
  showFaceID: true,
  publicToken: "",
  isFaceIDenabled: false,
  isFirstTime: true,
  phone: "",
  fcmToken: ""
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
        phone: action.data.phone,
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

      
      case types.FACE_ID_POPUP: {
        return {
            ...state,
            showFaceID: false
            };
        }
    
        
      case types.ENABLE_FACE_ID: {
        return {
            ...state,
            isFaceIDenabled: true,
            publicToken: action.data.hash_id
            };
        }

        case types.DISABLE_FACE_ID: {
          return {
              ...state,
              isFaceIDenabled: false
              };
          }


      case types.SLIDER_VISITED: {
        return {
            ...state,
            isFirstTime: false
            };
        } 
        

      case types.FCM_TOKEN: {
        return {
            ...state,
            fcmToken: action.data.fcm_token
            };
        }
        

    default:
      return state
  }
};

export default combineReducers({ appReducer })