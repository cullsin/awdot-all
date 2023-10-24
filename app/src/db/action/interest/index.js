import { 
    INSERT_INTEREST_REQUEST,
    GET_INTEREST_REQUEST,
    LIST_INTEREST_REQUEST,
    PARTNERS_INTEREST_REQUEST,
    REMOVE_INTEREST_REQUEST,
    INIT_INTEREST_REQUEST
} from '../../actionTypes/interest';

export const initInterestRequest = (params) => {
  return {
    type: INIT_INTEREST_REQUEST,
    payload:params
  };
};

export const insertInterestRequest = (params) => {
  return {
    type: INSERT_INTEREST_REQUEST,
    payload:params
  };
};

export const getInterestRequest = (params) => {
  return {
    type: GET_INTEREST_REQUEST,
    payload:params
  };
};

export const listInterestRequest = (params) => {
  return {
    type: LIST_INTEREST_REQUEST,
    payload:params
  };
};

export const partnersInterestRequest = (params) => {
  return {
    type: PARTNERS_INTEREST_REQUEST,
    payload:params
  };
};

export const removeInterestRequest = (params) => {
  return {
    type: REMOVE_INTEREST_REQUEST,
    payload:params
  };
};
