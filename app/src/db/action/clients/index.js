import { 
    INSERT_CLIENTS_REQUEST,
    GET_CLIENTS_REQUEST,
    LIST_CLIENTS_REQUEST,
    PARTNERS_CLIENTS_REQUEST,
    REMOVE_CLIENTS_REQUEST,
    INIT_CLIENTS_REQUEST
} from '../../actionTypes/clients';

export const initClientsRequest = (params) => {
  return {
    type: INIT_CLIENTS_REQUEST,
    payload:params
  };
};

export const insertClientsRequest = (params) => {
  return {
    type: INSERT_CLIENTS_REQUEST,
    payload:params
  };
};

export const getClientsRequest = (params) => {
  return {
    type: GET_CLIENTS_REQUEST,
    payload:params
  };
};

export const listClientsRequest = (params) => {
  return {
    type: LIST_CLIENTS_REQUEST,
    payload:params
  };
};

export const partnersClientsRequest = (params) => {
  return {
    type: PARTNERS_CLIENTS_REQUEST,
    payload:params
  };
};

export const removeClientsRequest = (params) => {
  return {
    type: REMOVE_CLIENTS_REQUEST,
    payload:params
  };
};
