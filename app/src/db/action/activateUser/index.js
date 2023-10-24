import { ACTIVATE_USER_REQUEST, ACTIVATE_USER_SUCCESS
  } from '../../actionTypes/activateUser';
  
  export const activateUserRequest = (params) => {
  return {
    type: ACTIVATE_USER_REQUEST,
    payload:params
  };
  };
  
  export const activateUserSuccess = () => {
  return {
    type: ACTIVATE_USER_SUCCESS
  };
  };
  