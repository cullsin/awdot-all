import { 
    INSERT_PARTNERS_REQUEST,
    UPDATE_PARTNERS_REQUEST,
    GET_PARTNERS_REQUEST,
    LIST_PARTNERS_REQUEST,
    USER_PARTNERS_REQUEST,
    REMOVE_PARTNERS_REQUEST,
    INTERESTED_PARTNERS_REQUEST,
    INIT_PARTNERS_REQUEST
} from '../../actionTypes/partners';

export const initPartnersRequest = (params) => {
  return {
    type: INIT_PARTNERS_REQUEST,
    payload:params
  };
};

export const updatePartnersRequest = (params) => {
  return {
    type: UPDATE_PARTNERS_REQUEST,
    payload:params
  };
};

export const insertPartnersRequest = (params) => {
  return {
    type: INSERT_PARTNERS_REQUEST,
    payload:params
  };
};

export const getPartnersRequest = (params) => {
  return {
    type: GET_PARTNERS_REQUEST,
    payload:params
  };
};

export const listPartnersRequest = (params) => {
  return {
    type: LIST_PARTNERS_REQUEST,
    payload:params
  };
};

export const userPartnersRequest = (params) => {
  return {
    type: USER_PARTNERS_REQUEST,
    payload:params
  };
};

export const removePartnersRequest = (params) => {
  return {
    type: REMOVE_PARTNERS_REQUEST,
    payload:params
  };
};

export const interestedPartnersRequest = (params) => {
  return {
    type: INTERESTED_PARTNERS_REQUEST,
    payload:params
  };
};