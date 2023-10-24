import {  
    INSERT_DOMAIN_REQUEST,
    INSERT_DOMAIN_SUCCESS,
    UPDATE_DOMAIN_REQUEST,
    UPDATE_DOMAIN_SUCCESS,
    GET_DOMAIN_REQUEST,
    GET_DOMAIN_SUCCESS,
    USER_DOMAIN_REQUEST,
    USER_DOMAIN_SUCCESS,
    LIST_DOMAIN_REQUEST,
    LIST_DOMAIN_SUCCESS,
    REMOVE_DOMAIN_REQUEST,
    REMOVE_DOMAIN_SUCCESS,
    TYPE_DOMAIN_REQUEST,
    TYPE_DOMAIN_SUCCESS
  } from '../../actionTypes/domain';
  
  const domainReducer = (state = {}, action) => {
    switch (action.type) {  
      case INSERT_DOMAIN_REQUEST:
        state = { ...state, insert: {} };
        break;
        case UPDATE_DOMAIN_REQUEST:
        state = { ...state, insert: {} };
        break;
      case GET_DOMAIN_REQUEST:
          state = { ...state, get: [] };
          break;
      case USER_DOMAIN_REQUEST:
        state = { ...state, user: {} };
        break;
      case LIST_DOMAIN_REQUEST:
          state = { ...state, list: {} };
          break;
      case REMOVE_DOMAIN_REQUEST:
        state = { ...state, remove: {} };
        break;
      case TYPE_DOMAIN_REQUEST:
        state = { ...state, interested: {} };
        break;  
    case INSERT_DOMAIN_SUCCESS:
        state = { ...state,
                  insert:{
                      ...action.payload  
                  }
              };
        break;  
        case UPDATE_DOMAIN_SUCCESS:
          state = { ...state,
                    update:{
                        ...action.payload  
                    }
                };
          break;  
    
      case GET_DOMAIN_SUCCESS:
        state = { ...state,
                  get:{
                      ...action.payload  
                  }
              };
        break;
      case LIST_DOMAIN_SUCCESS:
        state = { ...state,
                  list:{
                      ...action.payload
                  }
              };
      break;        
      case USER_DOMAIN_SUCCESS:
        state = { ...state,
                  user:{
                      ...action.payload
                  }
                };        
        break;
      case REMOVE_DOMAIN_SUCCESS:
        state = { ...state,
                  remove:{
                      ...action.payload
                  }
                };        
        break;
      case TYPE_DOMAIN_SUCCESS:
        state = { ...state,
                  type:{
                      ...action.payload
                  }
                };        
        break;
      default:
        break;
    }
    return state;
  };
  export default domainReducer;