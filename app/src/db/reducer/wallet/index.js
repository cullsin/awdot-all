import {  
  INSERT_WALLET_REQUEST,
  INSERT_WALLET_SUCCESS,
  INSERT_WALLET_HISTORY_REQUEST,
  INSERT_WALLET_HISTORY_SUCCESS,
  USER_WALLET_HISTORY_REQUEST, 
  USER_WALLET_HISTORY_SUCCESS,
  GET_WALLET_REQUEST,
  GET_WALLET_SUCCESS,
  USER_WALLET_REQUEST,
  USER_WALLET_SUCCESS,
  UPDATE_WALLET_REQUEST,
  UPDATE_WALLET_SUCCESS
} from '../../actionTypes/wallet';

const walletReducer = (state = {}, action) => {
  switch (action.type) {  
    case INSERT_WALLET_REQUEST:
      state = { ...state, insert: {} };
      break;
    case GET_WALLET_REQUEST:
        state = { ...state, get: [] };
        break;
    case USER_WALLET_REQUEST:
      state = { ...state, user: {} };
      break;
    case UPDATE_WALLET_REQUEST:
      state = { ...state, update: {} };
      break;
    case INSERT_WALLET_HISTORY_REQUEST:
      state = { ...state, insertHistory: {} };
      break;
      case USER_WALLET_HISTORY_REQUEST:
      state = { ...state, userHistory: {} };
      break;

  case INSERT_WALLET_SUCCESS:
      state = { ...state,
                insert:{
                    ...action.payload  
                }
            };
      break;  
    case GET_WALLET_SUCCESS:
      state = { ...state,
                get:{
                    ...action.payload  
                }
            };
      break;
    case USER_WALLET_SUCCESS:
      state = { ...state,
                user:{
                    ...action.payload
                }
              };        
      break;
    case UPDATE_WALLET_SUCCESS:
      state = { ...state,
                update:{
                    ...action.payload
                }
              };        
      break;
      case INSERT_WALLET_HISTORY_SUCCESS:
        state = { ...state,
                  insertHistory:{
                      ...action.payload  
                  }
              };
        break;
        case USER_WALLET_HISTORY_SUCCESS:
          state = { ...state,
                    userHistory:{
                        ...action.payload  
                    }
                };
          break;   
      default:
      break;
  }
  return state;
};
export default walletReducer;