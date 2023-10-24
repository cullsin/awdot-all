import {  
    INSERT_CLIENTS_REQUEST,
    INSERT_CLIENTS_SUCCESS,
    GET_CLIENTS_REQUEST,
    GET_CLIENTS_SUCCESS,
    PARTNERS_CLIENTS_REQUEST,
    PARTNERS_CLIENTS_SUCCESS,
    LIST_CLIENTS_REQUEST,
    LIST_CLIENTS_SUCCESS,
    REMOVE_CLIENTS_REQUEST,
    REMOVE_CLIENTS_SUCCESS,
    INIT_CLIENTS_REQUEST
  } from '../../actionTypes/clients';
  
  const clientsReducer = (state = {}, action) => {
    switch (action.type) {  
      case INIT_CLIENTS_REQUEST:
        state = { ...state, insert: {}, get: [], companies: {} , list: {}, remove: {} };
        break;
      case INSERT_CLIENTS_REQUEST:
        state = { ...state, insert: {} };
        break;
      case GET_CLIENTS_REQUEST:
          state = { ...state, get: [] };
          break;
      case PARTNERS_CLIENTS_REQUEST:
        state = { ...state, companies: {} };
        break;
      case LIST_CLIENTS_REQUEST:
          state = { ...state, list: {} };
          break;
      case REMOVE_CLIENTS_REQUEST:
        state = { ...state, remove: {} };
        break;
    case INSERT_CLIENTS_SUCCESS:
        state = { ...state,
                  insert:{
                      ...action.payload  
                  }
              };
        break;  
        case GET_CLIENTS_SUCCESS:
        state = { ...state,
                  get:{
                      ...action.payload  
                  }
              };
        break;
      case LIST_CLIENTS_SUCCESS:
        state = { ...state,
                  list:{
                      ...action.payload
                  }
              };
      break;        
      case PARTNERS_CLIENTS_SUCCESS:
        state = { ...state,
                  partners:{
                      ...action.payload
                  }
                };        
        break;
      case REMOVE_CLIENTS_SUCCESS:
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
  export default clientsReducer;