import { 
    INSERT_CATEGORIES_REQUEST,
    GET_CATEGORIES_REQUEST,
    LIST_CATEGORIES_REQUEST,
    COMPANIES_CATEGORIES_REQUEST,
    REMOVE_CATEGORIES_REQUEST,
    INIT_CATEGORIES_REQUEST
} from '../../actionTypes/categories';

export const initCategoriesRequest = (params) => {
  return {
    type: INIT_CATEGORIES_REQUEST,
    payload:params
  };
};

export const insertCategoriesRequest = (params) => {
  return {
    type: INSERT_CATEGORIES_REQUEST,
    payload:params
  };
};

export const getCategoriesRequest = (params) => {
  return {
    type: GET_CATEGORIES_REQUEST,
    payload:params
  };
};

export const listCategoriesRequest = (params) => {
  return {
    type: LIST_CATEGORIES_REQUEST,
    payload:params
  };
};

export const companiesCategoriesRequest = (params) => {
  return {
    type: COMPANIES_CATEGORIES_REQUEST,
    payload:params
  };
};

export const removeCategoriesRequest = (params) => {
  return {
    type: REMOVE_CATEGORIES_REQUEST,
    payload:params
  };
};
