import { 
  INSERT_INVESTMENT_REQUEST,
  UPDATE_INVESTMENT_REQUEST,
  GET_INVESTMENT_REQUEST,
  LIST_INVESTMENT_REQUEST,
  USER_INVESTMENT_REQUEST,
  REMOVE_INVESTMENT_REQUEST,
  INTERESTED_INVESTMENT_REQUEST
} from '../../actionTypes/investment';

export const insertInvestmentRequest = (params) => {
return {
  type: INSERT_INVESTMENT_REQUEST,
  payload:params
};
};

export const updateInvestmentRequest = (params) => {
  return {
    type: UPDATE_INVESTMENT_REQUEST,
    payload:params
  };
};

export const getInvestmentRequest = (params) => {
return {
  type: GET_INVESTMENT_REQUEST,
  payload:params
};
};

export const listInvestmentRequest = (params) => {
return {
  type: LIST_INVESTMENT_REQUEST,
  payload:params
};
};

export const userInvestmentRequest = (params) => {
return {
  type: USER_INVESTMENT_REQUEST,
  payload:params
};
};

export const removeInvestmentRequest = (params) => {
return {
  type: REMOVE_INVESTMENT_REQUEST,
  payload:params
};
};

export const interestedInvestmentRequest = (params) => {
return {
  type: INTERESTED_INVESTMENT_REQUEST,
  payload:params
};
};