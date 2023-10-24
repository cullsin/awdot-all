import {  
  INSERT_INVESTMENT_REQUEST,
  INSERT_INVESTMENT_SUCCESS,
  UPDATE_INVESTMENT_REQUEST,
  UPDATE_INVESTMENT_SUCCESS,
  GET_INVESTMENT_REQUEST,
  GET_INVESTMENT_SUCCESS,
  USER_INVESTMENT_REQUEST,
  USER_INVESTMENT_SUCCESS,
  LIST_INVESTMENT_REQUEST,
  LIST_INVESTMENT_SUCCESS,
  REMOVE_INVESTMENT_REQUEST,
  REMOVE_INVESTMENT_SUCCESS,
  INTERESTED_INVESTMENT_REQUEST,
  INTERESTED_INVESTMENT_SUCCESS
} from '../../actionTypes/investment';

const investmentReducer = (state = {}, action) => {
  switch (action.type) {  
    case INSERT_INVESTMENT_REQUEST:
      state = { ...state, insert: {} };
      break;
      case UPDATE_INVESTMENT_REQUEST:
      state = { ...state, insert: {} };
      break;
    case GET_INVESTMENT_REQUEST:
        state = { ...state, get: [] };
        break;
    case USER_INVESTMENT_REQUEST:
      state = { ...state, user: {} };
      break;
    case LIST_INVESTMENT_REQUEST:
        state = { ...state, list: {} };
        break;
    case REMOVE_INVESTMENT_REQUEST:
      state = { ...state, remove: {} };
      break;
    case INTERESTED_INVESTMENT_REQUEST:
      state = { ...state, interested: {} };
      break;  
  case INSERT_INVESTMENT_SUCCESS:
      state = { ...state,
                insert:{
                    ...action.payload  
                }
            };
      break;  
      case UPDATE_INVESTMENT_SUCCESS:
        state = { ...state,
                  update:{
                      ...action.payload  
                  }
              };
        break;  
  
    case GET_INVESTMENT_SUCCESS:
      state = { ...state,
                get:{
                    ...action.payload  
                }
            };
      break;
    case LIST_INVESTMENT_SUCCESS:
      state = { ...state,
                list:{
                    ...action.payload
                }
            };
    break;        
    case USER_INVESTMENT_SUCCESS:
      state = { ...state,
                user:{
                    ...action.payload
                }
              };        
      break;
    case REMOVE_INVESTMENT_SUCCESS:
      state = { ...state,
                remove:{
                    ...action.payload
                }
              };        
      break;
    case INTERESTED_INVESTMENT_SUCCESS:
      state = { ...state,
                interested:{
                    ...action.payload
                }
              };        
      break;
    default:
      break;
  }
  return state;
};
export default investmentReducer;