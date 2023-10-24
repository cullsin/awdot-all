import { 
    INSERT_DOMAIN_REQUEST,
    UPDATE_DOMAIN_REQUEST,
    GET_DOMAIN_REQUEST,
    LIST_DOMAIN_REQUEST,
    USER_DOMAIN_REQUEST,
    REMOVE_DOMAIN_REQUEST,
    TYPE_DOMAIN_REQUEST
  } from '../../actionTypes/domain';
  
  export const insertDomainRequest = (params) => {
  return {
    type: INSERT_DOMAIN_REQUEST,
    payload:params
  };
  };
  
  export const updateDomainRequest = (params) => {
    return {
      type: UPDATE_DOMAIN_REQUEST,
      payload:params
    };
  };
  
  export const getDomainRequest = (params) => {
  return {
    type: GET_DOMAIN_REQUEST,
    payload:params
  };
  };
  
  export const listDomainRequest = (params) => {
  return {
    type: LIST_DOMAIN_REQUEST,
    payload:params
  };
  };
  
  export const userDomainRequest = (params) => {
  return {
    type: USER_DOMAIN_REQUEST,
    payload:params
  };
  };
  
  export const removeDomainRequest = (params) => {
  return {
    type: REMOVE_DOMAIN_REQUEST,
    payload:params
  };
  };
  
  export const typeDomainRequest = (params) => {
  return {
    type: TYPE_DOMAIN_REQUEST,
    payload:params
  };
  };