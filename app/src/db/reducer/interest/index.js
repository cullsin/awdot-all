import {  
    INSERT_INTEREST_REQUEST,
    INSERT_INTEREST_SUCCESS,
    GET_INTEREST_REQUEST,
    GET_INTEREST_SUCCESS,
    PARTNERS_INTEREST_REQUEST,
    PARTNERS_INTEREST_SUCCESS,
    LIST_INTEREST_REQUEST,
    LIST_INTEREST_SUCCESS,
    REMOVE_INTEREST_REQUEST,
    REMOVE_INTEREST_SUCCESS,
    INIT_INTEREST_REQUEST
  } from '../../actionTypes/interest';
  
  const categoriesReducer = (state = {}, action) => {
    switch (action.type) {  
      case INIT_INTEREST_REQUEST:
        state = { ...state, insert: {}, get: [], companies: {} , list: {}, remove: {} };
        break;
      case INSERT_INTEREST_REQUEST:
        state = { ...state, insert: {} };
        break;
      case GET_INTEREST_REQUEST:
          state = { ...state, get: [] };
          break;
      case PARTNERS_INTEREST_REQUEST:
        state = { ...state, companies: {} };
        break;
      case LIST_INTEREST_REQUEST:
          state = { ...state, list: {} };
          break;
      case REMOVE_INTEREST_REQUEST:
        state = { ...state, remove: {} };
        break;
    case INSERT_INTEREST_SUCCESS:
        state = { ...state,
                  insert:{
                      ...action.payload  
                  }
              };
        break;  
        case GET_INTEREST_SUCCESS:
        state = { ...state,
                  get:{
                      ...action.payload  
                  }
              };
        break;
      case LIST_INTEREST_SUCCESS:
        state = { ...state,
                  list:{
                      ...action.payload
                  }
              };
      break;        
      case PARTNERS_INTEREST_SUCCESS:
        state = { ...state,
                  partners:{
                      ...action.payload
                  }
                };        
        break;
      case REMOVE_INTEREST_SUCCESS:
        state = { ...state,
                  remove:{
                      ...action.payload
                  }
                };        
        break;
      default:
        break;
    }
    return state;
  };
  export default categoriesReducer;