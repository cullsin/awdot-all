import {  
    INIT_GDB_COMPANIES_REQUEST,
    GET_GDB_COMPANIES_REQUEST,
    GET_GDB_COMPANIES_SUCCESS,
    LIST_GDB_COMPANIES_REQUEST,
    LIST_GDB_COMPANIES_SUCCESS,
    SEARCH_GDB_COMPANIES_REQUEST,
    SEARCH_GDB_COMPANIES_SUCCESS,
    MAIL_GDB_COMPANIES_REQUEST,
    MAIL_GDB_COMPANIES_SUCCESS
  } from '../../actionTypes/gdb';
  
  const gdbReducer = (state = {}, action) => {
    switch (action.type) {  
      case INIT_GDB_COMPANIES_REQUEST:
        state = { ...state, get: {} , list: {} };
      break;
      case GET_GDB_COMPANIES_REQUEST:
          state = { ...state, get: [] };
          break;
      case LIST_GDB_COMPANIES_REQUEST:
          state = { ...state, list: {} };
          break;
      case SEARCH_GDB_COMPANIES_REQUEST:
        state = { ...state, search: {} };
        break;  
        case MAIL_GDB_COMPANIES_REQUEST:
          state = { ...state, mail: {} };
          break;  
        case GET_GDB_COMPANIES_SUCCESS:
        state = { ...state,
                  get:{
                      ...action.payload  
                  }
              };
        break;
      case LIST_GDB_COMPANIES_SUCCESS:
        state = { ...state,
                  list:{
                      ...action.payload
                  }
              };
      break;        
      case SEARCH_GDB_COMPANIES_SUCCESS:
        state = { ...state,
                  search:{
                      ...action.payload
                  }
                };        
        break;
        case MAIL_GDB_COMPANIES_SUCCESS:
        state = { ...state,
                  mail:{
                      ...action.payload
                  }
                };        
        break;
      default:
        break;
    }
    return state;
  };
  export default gdbReducer;