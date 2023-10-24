import { 
    INSERT_COMPANIES_REQUEST,
    UPDATE_COMPANIES_REQUEST,
    GET_COMPANIES_REQUEST,
    LIST_COMPANIES_REQUEST,
    USER_COMPANIES_REQUEST,
    REMOVE_COMPANIES_REQUEST,
    INTERESTED_COMPANIES_REQUEST,
    INIT_COMPANIES_REQUEST
} from '../../actionTypes/companies';

export const initCompaniesRequest = (params) => {
  return {
    type: INIT_COMPANIES_REQUEST,
    payload:params
  };
};

export const updateCompaniesRequest = (params) => {
  return {
    type: UPDATE_COMPANIES_REQUEST,
    payload:params
  };
};

export const insertCompaniesRequest = (params) => {
  return {
    type: INSERT_COMPANIES_REQUEST,
    payload:params
  };
};

export const getCompaniesRequest = (params) => {
  return {
    type: GET_COMPANIES_REQUEST,
    payload:params
  };
};

export const listCompaniesRequest = (params) => {
  return {
    type: LIST_COMPANIES_REQUEST,
    payload:params
  };
};

export const userCompaniesRequest = (params) => {
  return {
    type: USER_COMPANIES_REQUEST,
    payload:params
  };
};

export const removeCompaniesRequest = (params) => {
  return {
    type: REMOVE_COMPANIES_REQUEST,
    payload:params
  };
};

export const interestedCompaniesRequest = (params) => {
  return {
    type: INTERESTED_COMPANIES_REQUEST,
    payload:params
  };
};