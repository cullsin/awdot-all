import { 
  INSERT_WALLET_REQUEST,
  INSERT_WALLET_HISTORY_REQUEST,
  GET_WALLET_REQUEST,
  USER_WALLET_REQUEST,
  USER_WALLET_HISTORY_REQUEST,
  UPDATE_WALLET_REQUEST
} from '../../actionTypes/wallet';

export const insertWalletRequest = (params) => {
return {
  type: INSERT_WALLET_REQUEST,
  payload:params
};
};

export const getWalletRequest = (params) => {
return {
  type: GET_WALLET_REQUEST,
  payload:params
};
};

export const userWalletRequest = (params) => {
return {
  type: USER_WALLET_REQUEST,
  payload:params
};
};

export const updateWalletRequest = (params) => {
return {
  type: UPDATE_WALLET_REQUEST,
  payload:params
};
};

export const userWalletHistoryRequest = (params) => {
  return {
    type: USER_WALLET_HISTORY_REQUEST,
    payload:params
  };
  };
  
  export const insertWalletHistoryRequest = (params) => {
  return {
    type: INSERT_WALLET_HISTORY_REQUEST,
    payload:params
  };
};