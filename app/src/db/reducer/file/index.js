import {  
    INIT_FILE_REQUEST, UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS,
    GET_FILE_REQUEST, GET_FILE_SUCCESS,
    REMOVE_FILE_REQUEST, REMOVE_FILE_SUCCESS,
    INSERT_FILE_CONNECT_REQUEST, INSERT_FILE_CONNECT_SUCCESS,
    GET_FILE_CONNECT_REQUEST, GET_FILE_CONNECT_SUCCESS,
    REMOVE_FILE_CONNECT_REQUEST, REMOVE_FILE_CONNECT_SUCCESS,
    USER_FILE_CONNECT_REQUEST, USER_FILE_CONNECT_SUCCESS,
  } from '../../actionTypes/file';
  
  const fileReducer = (state = {}, action) => {
    switch (action.type) {            
      case INIT_FILE_REQUEST:
        state = { ...state, upload: {} };
        break;
      case UPLOAD_FILE_REQUEST:
        state = { ...state, upload: {} };
        break;
      case GET_FILE_REQUEST:
        state = { ...state, get: [] };
        break;
      case REMOVE_FILE_REQUEST:
        state = { ...state, remove: {} };
        break;
      case UPLOAD_FILE_SUCCESS: {
        state = { ...state,
          upload:{
              ...action.payload
          }
        };      
        break;
      }          
      case GET_FILE_SUCCESS: {
        state = { ...state,
          get:{
              ...action.payload
          }
        };      
        break;
      }
      case REMOVE_FILE_SUCCESS: {
        state = { ...state,
          remove:{
              ...action.payload
          }
        };      
        break;
      }       
      case INSERT_FILE_CONNECT_REQUEST:
        state = { ...state, insert: {} };
        break;
      case GET_FILE_CONNECT_REQUEST:
        state = { ...state, getConnect: [] };
        break;
      case REMOVE_FILE_CONNECT_REQUEST:
        state = { ...state, removeConnect: {} };
        break;
      case USER_FILE_CONNECT_REQUEST:
        state = { ...state, user: {} };
        break;
      case INSERT_FILE_CONNECT_SUCCESS: {
            state = { ...state,
              insert:{
                  ...action.payload
              }
            };      
            break;
          }          
          case GET_FILE_CONNECT_SUCCESS: {
            state = { ...state,
              getConnect:{
                  ...action.payload
              }
            };      
            break;
          }
          case REMOVE_FILE_CONNECT_SUCCESS: {
            state = { ...state,
              removeConnect:{
                  ...action.payload
              }
            };      
            break;
          }
          case USER_FILE_CONNECT_SUCCESS: {
            state = { ...state,
              user:{
                  ...action.payload
              }
            };      
            break;
          }   
      default:
        break;
    }
    return state;
  };
  export default fileReducer;