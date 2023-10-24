import {  
  INIT_COMPANIES_REQUEST,
  INSERT_COMPANIES_REQUEST,
  INSERT_COMPANIES_SUCCESS,
  UPDATE_COMPANIES_REQUEST,
  UPDATE_COMPANIES_SUCCESS,
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_SUCCESS,
  USER_COMPANIES_REQUEST,
  USER_COMPANIES_SUCCESS,
  LIST_COMPANIES_REQUEST,
  LIST_COMPANIES_SUCCESS,
  REMOVE_COMPANIES_REQUEST,
  REMOVE_COMPANIES_SUCCESS,
  INTERESTED_COMPANIES_REQUEST,
  INTERESTED_COMPANIES_SUCCESS
} from '../../actionTypes/companies';

const companiesReducer = (state = {}, action) => {
  switch (action.type) {  
    case INIT_COMPANIES_REQUEST:
      state = { ...state, insert: {}, update: {}, get: {} , user: {}, list: {}, remove: {} };
    break;
    case INSERT_COMPANIES_REQUEST:
      state = { ...state, insert: {} };
      break;
      case UPDATE_COMPANIES_REQUEST:
        state = { ...state, update: {} };
        break;
    case GET_COMPANIES_REQUEST:
        state = { ...state, get: [] };
        break;
    case USER_COMPANIES_REQUEST:
      state = { ...state, user: {} };
      break;
    case LIST_COMPANIES_REQUEST:
        state = { ...state, list: {} };
        break;
    case REMOVE_COMPANIES_REQUEST:
      state = { ...state, remove: {} };
      break;
    case INTERESTED_COMPANIES_REQUEST:
      state = { ...state, interested: {} };
      break;  
  case INSERT_COMPANIES_SUCCESS:
      state = { ...state,
                insert:{
                    ...action.payload  
                }
            };
      break;  
  case UPDATE_COMPANIES_SUCCESS:
        state = { ...state,
                  update:{
                      ...action.payload  
                  }
              };
        break;  
  
      case GET_COMPANIES_SUCCESS:
      state = { ...state,
                get:{
                    ...action.payload  
                }
            };
      break;
    case LIST_COMPANIES_SUCCESS:
      state = { ...state,
                list:{
                    ...action.payload
                }
            };
    break;        
    case USER_COMPANIES_SUCCESS:
      state = { ...state,
                user:{
                    ...action.payload
                }
              };        
      break;
    case REMOVE_COMPANIES_SUCCESS:
      state = { ...state,
                remove:{
                    ...action.payload
                }
              };        
      break;
    case INTERESTED_COMPANIES_SUCCESS:
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
export default companiesReducer;