import {  
  INSERT_TRANSACTION_REQUEST,
  INSERT_TRANSACTION_SUCCESS,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  USER_TRANSACTION_REQUEST,
  USER_TRANSACTION_SUCCESS,
} from '../../actionTypes/transaction';

const transactionReducer = (state = {}, action) => {
  switch (action.type) {  
    case INSERT_TRANSACTION_REQUEST:
      state = { ...state, insert: {} };
      break;
    case GET_TRANSACTION_REQUEST:
        state = { ...state, get: [] };
        break;
    case USER_TRANSACTION_REQUEST:
      state = { ...state, user: {} };
      break;
  case INSERT_TRANSACTION_SUCCESS:
      state = { ...state,
                insert:{
                    ...action.payload  
                }
            };
      break;  
    case GET_TRANSACTION_SUCCESS:
      state = { ...state,
                get:{
                    ...action.payload  
                }
            };
      break;
    case USER_TRANSACTION_SUCCESS:
      state = { ...state,
                user:{
                    ...action.payload
                }
              };        
      break;
    default:
      break;
  }
  return state;
};
export default transactionReducer;