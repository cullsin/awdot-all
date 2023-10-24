import {  
    INSERT_CATEGORIES_REQUEST,
    INSERT_CATEGORIES_SUCCESS,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    COMPANIES_CATEGORIES_REQUEST,
    COMPANIES_CATEGORIES_SUCCESS,
    LIST_CATEGORIES_REQUEST,
    LIST_CATEGORIES_SUCCESS,
    REMOVE_CATEGORIES_REQUEST,
    REMOVE_CATEGORIES_SUCCESS,
    INIT_CATEGORIES_REQUEST
  } from '../../actionTypes/categories';
  
  const categoriesReducer = (state = {}, action) => {
    switch (action.type) {  
      case INIT_CATEGORIES_REQUEST:
        state = { ...state, insert: {}, get: [], companies: {} , list: {}, remove: {} };
        break;
      case INSERT_CATEGORIES_REQUEST:
        state = { ...state, insert: {} };
        break;
      case GET_CATEGORIES_REQUEST:
          state = { ...state, get: [] };
          break;
      case COMPANIES_CATEGORIES_REQUEST:
        state = { ...state, companies: {} };
        break;
      case LIST_CATEGORIES_REQUEST:
          state = { ...state, list: {} };
          break;
      case REMOVE_CATEGORIES_REQUEST:
        state = { ...state, remove: {} };
        break;
    case INSERT_CATEGORIES_SUCCESS:
        state = { ...state,
                  insert:{
                      ...action.payload  
                  }
              };
        break;  
        case GET_CATEGORIES_SUCCESS:
        state = { ...state,
                  get:{
                      ...action.payload  
                  }
              };
        break;
      case LIST_CATEGORIES_SUCCESS:
        state = { ...state,
                  list:{
                      ...action.payload
                  }
              };
      break;        
      case COMPANIES_CATEGORIES_SUCCESS:
        state = { ...state,
                  companies:{
                      ...action.payload
                  }
                };        
        break;
      case REMOVE_CATEGORIES_SUCCESS:
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