import { 
    USER_BY_EMAIL_REQUEST, 
    USER_BY_EMAIL_SUCCESS
} from '../../actionTypes/user';

export const userByEmailRequest = (params) => {
return {
  type: USER_BY_EMAIL_REQUEST,
  payload:params
};
};

export const userByEmailSuccess = () => {
return {
  type: USER_BY_EMAIL_SUCCESS
};
};
