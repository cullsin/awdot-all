import {  
  INSERT_SHARES_REQUEST,
  INSERT_SHARES_SUCCESS,
  GET_SHARES_REQUEST,
  GET_SHARES_SUCCESS,
  USER_SHARES_REQUEST,
  USER_SHARES_SUCCESS,
  UPDATE_SHARES_REQUEST,
  UPDATE_SHARES_SUCCESS,
  BOUGHT_SHARES_REQUEST,
  BOUGHT_SHARES_SUCCESS,
  COMPANIES_SHARES_REQUEST,
  COMPANIES_SHARES_SUCCESS
} from '../../actionTypes/shares';

const sharesReducer = (state = {}, action) => {
  switch (action.type) {  
    case INSERT_SHARES_REQUEST:
      state = { ...state, insert: {} };
      break;
    case COMPANIES_SHARES_REQUEST:
        state = { ...state, company: {} };
        break;
    case GET_SHARES_REQUEST:
        state = { ...state, get: [] };
        break;
    case USER_SHARES_REQUEST:
      state = { ...state, user: {} };
      break;
    case UPDATE_SHARES_REQUEST:
      state = { ...state, update: {} };
      break;
    case BOUGHT_SHARES_REQUEST:
      state = { ...state, bought: {} };
      break;  
  case INSERT_SHARES_SUCCESS:
      state = { ...state,
                insert:{
                    ...action.payload  
                }
            };
      break;  
    case GET_SHARES_SUCCESS:
      state = { ...state,
                get:{
                    ...action.payload  
                }
            };
      break;
      case COMPANIES_SHARES_SUCCESS:
      state = { ...state,
                company:{
                    ...action.payload  
                }
            };
      break;
    case USER_SHARES_SUCCESS:
      state = { ...state,
                user:{
                    ...action.payload
                }
              };        
      break;
    case UPDATE_SHARES_SUCCESS:
      state = { ...state,
                update:{
                    ...action.payload
                }
              };        
      break;
    case BOUGHT_SHARES_SUCCESS:
      state = { ...state,
                bought:{
                    ...action.payload
                }
              };        
      break;
    default:
      break;
  }
  return state;
};
export default sharesReducer;