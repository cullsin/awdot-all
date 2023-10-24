import { CREATE_USER_REGISTER_REQUEST, GET_USER_REGISTER_SUCCESS
} from '../../actionTypes/registerUser';

export const createUserRegisterRequest = (data) => {
return {
  type: CREATE_USER_REGISTER_REQUEST,
  payload: data
};
};

export const getUserRegisterSuccess = () => {
return {
  type: GET_USER_REGISTER_SUCCESS
};
};
