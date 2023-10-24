import {  
  INIT_PARTNERS_REQUEST,
  INSERT_PARTNERS_REQUEST,
  INSERT_PARTNERS_SUCCESS,
  UPDATE_PARTNERS_REQUEST,
  UPDATE_PARTNERS_SUCCESS,
  GET_PARTNERS_REQUEST,
  GET_PARTNERS_SUCCESS,
  USER_PARTNERS_REQUEST,
  USER_PARTNERS_SUCCESS,
  LIST_PARTNERS_REQUEST,
  LIST_PARTNERS_SUCCESS,
  REMOVE_PARTNERS_REQUEST,
  REMOVE_PARTNERS_SUCCESS,
  INTERESTED_PARTNERS_REQUEST,
  INTERESTED_PARTNERS_SUCCESS
} from '../../actionTypes/partners';

const companiesReducer = (state = {}, action) => {
  switch (action.type) {  
    case INIT_PARTNERS_REQUEST:
      state = { ...state, insert: {}, update: {}, get: {} , user: {}, list: {}, remove: {} };
    break;
    case INSERT_PARTNERS_REQUEST:
      state = { ...state, insert: {} };
      break;
      case UPDATE_PARTNERS_REQUEST:
        state = { ...state, update: {} };
        break;
    case GET_PARTNERS_REQUEST:
        state = { ...state, get: [] };
        break;
    case USER_PARTNERS_REQUEST:
      state = { ...state, user: {} };
      break;
    case LIST_PARTNERS_REQUEST:
        state = { ...state, list: {} };
        break;
    case REMOVE_PARTNERS_REQUEST:
      state = { ...state, remove: {} };
      break;
    case INTERESTED_PARTNERS_REQUEST:
      state = { ...state, interested: {} };
      break;  
  case INSERT_PARTNERS_SUCCESS:
      state = { ...state,
                insert:{
                    ...action.payload  
                }
            };
      break;  
  case UPDATE_PARTNERS_SUCCESS:
        state = { ...state,
                  update:{
                      ...action.payload  
                  }
              };
        break;  
  
      case GET_PARTNERS_SUCCESS:
      state = { ...state,
                get:{
                    ...action.payload  
                }
            };
      break;
    case LIST_PARTNERS_SUCCESS:
      state = { ...state,
                list:{
                    ...action.payload
                }
            };
    break;        
    case USER_PARTNERS_SUCCESS:
      state = { ...state,
                user:{
                    ...action.payload
                }
              };        
      break;
    case REMOVE_PARTNERS_SUCCESS:
      state = { ...state,
                remove:{
                    ...action.payload
                }
              };        
      break;
    case INTERESTED_PARTNERS_SUCCESS:
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