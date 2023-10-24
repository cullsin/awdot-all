import {  
    CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS,
    GET_MESSAGE_REQUEST,GET_MESSAGE_SUCCESS,
    DELETE_MESSAGE_REQUEST,DELETE_MESSAGE_SUCCESS
  } from '../../actionTypes/message';
  
  const messageReducer = (state = {}, action) => {
    switch (action.type) {  
    case CREATE_MESSAGE_REQUEST:
        state = { ...state, create: {} };
        break;
    case GET_MESSAGE_REQUEST:
        state = { ...state, get: [] };
        break;
    case DELETE_MESSAGE_REQUEST:
        state = { ...state, delete: [] };
        break;
    case CREATE_MESSAGE_SUCCESS:
        state = { ...state, create: action.payload };
        break;
    case GET_MESSAGE_SUCCESS:
        state = { ...state, get: action.payload.messages };
        break;
    case DELETE_MESSAGE_SUCCESS:
        state = { ...state, delete: action.payload };
        break;
    default:
        break;
    }
    return state;
  };
  export default messageReducer;