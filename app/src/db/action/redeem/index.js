import { 
  INSERT_REDEEM_REQUEST,
  UPDATE_REDEEM_REQUEST,
  GET_REDEEM_REQUEST,
  USER_REDEEM_REQUEST,
  FEE_REDEEM_REQUEST
} from '../../actionTypes/redeem';

export const insertRedeemRequest = (params) => {
return {
  type: INSERT_REDEEM_REQUEST,
  payload:params
};
};

export const updateRedeemRequest = (params) => {
  return {
    type: UPDATE_REDEEM_REQUEST,
    payload:params
  };
};

export const getRedeemRequest = (params) => {
return {
  type: GET_REDEEM_REQUEST,
  payload:params
};
};

export const userRedeemRequest = (params) => {
return {
  type: USER_REDEEM_REQUEST,
  payload:params
};
};

export const feeRedeemRequest = (params) => {
  return {
    type: FEE_REDEEM_REQUEST,
    payload:params
  };
};
