import { 
  INSERT_SHARES_REQUEST,
  GET_SHARES_REQUEST,
  COMPANIES_SHARES_REQUEST,
  USER_SHARES_REQUEST,
  UPDATE_SHARES_REQUEST,
  BOUGHT_SHARES_REQUEST
} from '../../actionTypes/shares';

export const insertSharesRequest = (params) => {
return {
  type: INSERT_SHARES_REQUEST,
  payload:params
};
};

export const companiesSharesRequest = (params) => {
  return {
    type: COMPANIES_SHARES_REQUEST,
    payload:params
  };
};
  
export const getSharesRequest = (params) => {
return {
  type: GET_SHARES_REQUEST,
  payload:params
};
};

export const userSharesRequest = (params) => {
return {
  type: USER_SHARES_REQUEST,
  payload:params
};
};

export const updateSharesRequest = (params) => {
return {
  type: UPDATE_SHARES_REQUEST,
  payload:params
};
};

export const boughtSharesRequest = (params) => {
return {
  type: BOUGHT_SHARES_REQUEST,
  payload:params
};
};