import { 
    INSERT_PRODUCT_REQUEST,
    GET_PRODUCT_REQUEST,
    LIST_PRODUCT_REQUEST,
    COMPANIES_PRODUCT_REQUEST,
    REMOVE_PRODUCT_REQUEST,
    INIT_PRODUCT_REQUEST
} from '../../actionTypes/product';

export const initProductRequest = (params) => {
  return {
    type: INIT_PRODUCT_REQUEST,
    payload:params
  };
};

export const insertProductRequest = (params) => {
  return {
    type: INSERT_PRODUCT_REQUEST,
    payload:params
  };
};

export const getProductRequest = (params) => {
  return {
    type: GET_PRODUCT_REQUEST,
    payload:params
  };
};

export const listProductRequest = (params) => {
  return {
    type: LIST_PRODUCT_REQUEST,
    payload:params
  };
};

export const companiesProductRequest = (params) => {
  return {
    type: COMPANIES_PRODUCT_REQUEST,
    payload:params
  };
};

export const removeProductRequest = (params) => {
  return {
    type: REMOVE_PRODUCT_REQUEST,
    payload:params
  };
};
