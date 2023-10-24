import { GET_TOKEN_REQUEST, 
        GET_TOKEN_SUCCESS
    } from '../../actionTypes/token';

export const getTokenRequest = () => {
    return {
      type: GET_TOKEN_REQUEST
    };
};

export const getTokenSuccess = (token) => {
    return {
      type: GET_TOKEN_SUCCESS,
      payload: token,
    };
};
