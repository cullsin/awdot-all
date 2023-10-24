import { 
    GET_GDB_COMPANIES_REQUEST,
    LIST_GDB_COMPANIES_REQUEST,
    SEARCH_GDB_COMPANIES_REQUEST,
    MAIL_GDB_COMPANIES_REQUEST,
    INIT_GDB_COMPANIES_REQUEST
} from '../../actionTypes/gdb';

export const initGDBCompaniesRequest = (params) => {
  return {
    type: INIT_GDB_COMPANIES_REQUEST,
    payload:params
  };
};

export const getGDBCompaniesRequest = (params) => {
  return {
    type: GET_GDB_COMPANIES_REQUEST,
    payload:params
  };
};

export const listGDBCompaniesRequest = (params) => {
  return {
    type: LIST_GDB_COMPANIES_REQUEST,
    payload:params
  };
};

export const searchGDBCompaniesRequest = (params) => {
  return {
    type: SEARCH_GDB_COMPANIES_REQUEST,
    payload:params
  };
};


export const mailGDBCompaniesRequest = (params) => {
  return {
    type: MAIL_GDB_COMPANIES_REQUEST,
    payload:params
  };
};