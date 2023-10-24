import { 
  INSERT_TRANSACTION_REQUEST,
  GET_TRANSACTION_REQUEST,
  USER_TRANSACTION_REQUEST
} from '../../actionTypes/transaction';

export const insertTransactionRequest = (params) => {
return {
  type: INSERT_TRANSACTION_REQUEST,
  payload:params
};
};

export const getTransactionRequest = (params) => {
return {
  type: GET_TRANSACTION_REQUEST,
  payload:params
};
};

export const userTransactionRequest = (params) => {
return {
  type: USER_TRANSACTION_REQUEST,
  payload:params
};
};