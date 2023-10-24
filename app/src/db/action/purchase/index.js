import { 
  INSERT_PURCHASE_REQUEST,
  UPDATE_PURCHASE_REQUEST,
  GET_PURCHASE_REQUEST,
  USER_PURCHASE_REQUEST,
  FEE_PURCHASE_REQUEST
} from '../../actionTypes/purchase';

export const insertPurchaseRequest = (params) => {
return {
  type: INSERT_PURCHASE_REQUEST,
  payload:params
};
};

export const updatePurchaseRequest = (params) => {
  return {
    type: UPDATE_PURCHASE_REQUEST,
    payload:params
  };
};

export const feePurchaseRequest = (params) => {
  return {
    type: FEE_PURCHASE_REQUEST,
    payload:params
  };
};
  
export const getPurchaseRequest = (params) => {
return {
  type: GET_PURCHASE_REQUEST,
  payload:params
};
};

export const userPurchaseRequest = (params) => {
return {
  type: USER_PURCHASE_REQUEST,
  payload:params
};
};