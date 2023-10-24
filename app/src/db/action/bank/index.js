import { 
    INIT_BANK_REQUEST,
    CREATE_BANK_REQUEST,
    GET_BANK_REQUEST,
    DELETE_BANK_REQUEST
} from '../../actionTypes/bank';

export const initBankRequest = (params) => {
  return {
    type: INIT_BANK_REQUEST,
    payload:params
  };
};
  
export const createBankRequest = (params) => {
return {
  type: CREATE_BANK_REQUEST,
  payload:params
};
};

export const getBankRequest = (params) => {
return {
  type: GET_BANK_REQUEST,
  payload:params
};
};

export const deleteBankRequest = (params) => {
    return {
      type: DELETE_BANK_REQUEST,
      payload:params
    };
};