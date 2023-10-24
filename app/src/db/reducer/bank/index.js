import {  
    INIT_BANK_REQUEST,
    CREATE_BANK_REQUEST, CREATE_BANK_SUCCESS,
    GET_BANK_REQUEST,GET_BANK_SUCCESS,
    DELETE_BANK_REQUEST,DELETE_BANK_SUCCESS
  } from '../../actionTypes/bank';
  
  const bankReducer = (state = {}, action) => {
    switch (action.type) {  
    case INIT_BANK_REQUEST:
        state = { ...state, create: {} };
        break;
    case CREATE_BANK_REQUEST:
        state = { ...state, create: {} };
        break;
    case GET_BANK_REQUEST:
        state = { ...state, get: [] };
        break;
    case DELETE_BANK_REQUEST:
        state = { ...state, delete: [] };
        break;
    case CREATE_BANK_SUCCESS:
        state = { ...state, create: action.payload };
        break;
    case GET_BANK_SUCCESS:
        state = { ...state, get: action.payload };
        break;
    case DELETE_BANK_SUCCESS:
        state = { ...state, delete: action.payload };
        break;
    default:
        break;
    }
    return state;
  };
  export default bankReducer;