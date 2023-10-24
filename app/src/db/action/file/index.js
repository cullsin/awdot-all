import { UPLOAD_FILE_REQUEST, 
    INIT_FILE_REQUEST,
    REMOVE_FILE_REQUEST, 
    GET_FILE_REQUEST,
    INSERT_FILE_CONNECT_REQUEST, 
    REMOVE_FILE_CONNECT_REQUEST, 
    GET_FILE_CONNECT_REQUEST,
    USER_FILE_CONNECT_REQUEST
  } from '../../actionTypes/file';
  
  export const uploadFileRequest = (params) => {
    return {
      type: UPLOAD_FILE_REQUEST,
      payload:params
    };
  };
  
  export const initFileRequest = (params) => {
    return {
      type: INIT_FILE_REQUEST,
      payload:params
    };
  };

  export const removeFileRequest = (params) => {
    return {
      type: REMOVE_FILE_REQUEST,
      payload:params
    };
  };
  
  export const getFileRequest = (params) => {
    return {
      type: GET_FILE_REQUEST,
      payload:params
    };
  };
  
  export const insertFileConnectRequest = (params) => {
    return {
      type: INSERT_FILE_CONNECT_REQUEST,
      payload:params
    };
  };
  
  export const removeFileConnectRequest = (params) => {
    return {
      type: REMOVE_FILE_CONNECT_REQUEST,
      payload:params
    };
  };
  
  export const getFileConnectRequest = (params) => {
    return {
      type: GET_FILE_CONNECT_REQUEST,
      payload:params
    };
  };
 
  export const userFileConnectRequest = (params) => {
    return {
      type: USER_FILE_CONNECT_REQUEST,
      payload:params
    };
  };
  