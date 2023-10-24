import {  
  INSERT_REDEEM_REQUEST,
  INSERT_REDEEM_SUCCESS,
  UPDATE_REDEEM_REQUEST,
  UPDATE_REDEEM_SUCCESS,
  GET_REDEEM_REQUEST,
  GET_REDEEM_SUCCESS,
  USER_REDEEM_REQUEST,
  USER_REDEEM_SUCCESS,
  FEE_REDEEM_REQUEST,
  FEE_REDEEM_SUCCESS
} from '../../actionTypes/redeem';

const redeemReducer = (state = {}, action) => {
  switch (action.type) {  
    case INSERT_REDEEM_REQUEST:
      state = { ...state, insert: {} };
      break;
      case UPDATE_REDEEM_REQUEST:
        state = { ...state, update: {} };
        break;
    case GET_REDEEM_REQUEST:
        state = { ...state, get: [] };
        break;
    case FEE_REDEEM_REQUEST:
      state = { ...state, get: [] };
      break;
    case USER_REDEEM_REQUEST:
      state = { ...state, user: {} };
      break;
  case INSERT_REDEEM_SUCCESS:
      state = { ...state,
                insert:{
                    ...action.payload  
                }
            };
      break; 
    case FEE_REDEEM_SUCCESS:
      state = { ...state,
                fee:{
                    ...action.payload  
                }
            };
      break;
    case GET_REDEEM_SUCCESS:
      state = { ...state,
                get:{
                    ...action.payload  
                }
            };
      break;
    case UPDATE_REDEEM_SUCCESS:
      state = { ...state,
                update:{
                    ...action.payload  
                }
            };
      break;
    case USER_REDEEM_SUCCESS:
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
export default redeemReducer;