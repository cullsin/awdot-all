import { FORGET_USER_REQUEST, FORGET_USER_SUCCESS
} from '../../actionTypes/forgetPassword';

export const forgetPasswordRequest = (params) => {
return {
  type: FORGET_USER_REQUEST,
  payload:params
};
};

export const forgetPasswordSuccess = () => {
return {
  type: FORGET_USER_SUCCESS
};
};
