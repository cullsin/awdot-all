import {  
    INSERT_PRODUCT_REQUEST,
    INSERT_PRODUCT_SUCCESS,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    COMPANIES_PRODUCT_REQUEST,
    COMPANIES_PRODUCT_SUCCESS,
    LIST_PRODUCT_REQUEST,
    LIST_PRODUCT_SUCCESS,
    REMOVE_PRODUCT_REQUEST,
    REMOVE_PRODUCT_SUCCESS,
    INIT_PRODUCT_REQUEST
  } from '../../actionTypes/product';
  
  const productReducer = (state = {}, action) => {
    switch (action.type) {  
      case INIT_PRODUCT_REQUEST:
        state = { ...state, insert: {}, get: [], companies: {} , list: {}, remove: {} };
        break;
      case INSERT_PRODUCT_REQUEST:
        state = { ...state, insert: {} };
        break;
      case GET_PRODUCT_REQUEST:
          state = { ...state, get: [] };
          break;
      case COMPANIES_PRODUCT_REQUEST:
        state = { ...state, companies: {} };
        break;
      case LIST_PRODUCT_REQUEST:
          state = { ...state, list: {} };
          break;
      case REMOVE_PRODUCT_REQUEST:
        state = { ...state, remove: {} };
        break;
    case INSERT_PRODUCT_SUCCESS:
        state = { ...state,
                  insert:{
                      ...action.payload  
                  }
              };
        break;  
        case GET_PRODUCT_SUCCESS:
        state = { ...state,
                  get:{
                      ...action.payload  
                  }
              };
        break;
      case LIST_PRODUCT_SUCCESS:
        state = { ...state,
                  list:{
                      ...action.payload
                  }
              };
      break;        
      case COMPANIES_PRODUCT_SUCCESS:
        state = { ...state,
                  companies:{
                      ...action.payload
                  }
                };        
        break;
      case REMOVE_PRODUCT_SUCCESS:
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
  export default productReducer;