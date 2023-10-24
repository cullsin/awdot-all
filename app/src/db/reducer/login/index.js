import {  INIT_LOGIN_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS 
} from '../../actionTypes/login';

const loginReducer = (state = {}, action) => {
  switch (action.type) {  
    case INIT_LOGIN_REQUEST:
    case LOGIN_REQUEST:
      state = { accessToken: undefined, refreshToken: undefined };
      break;
    case LOGIN_SUCCESS:
      state = { ...state,  
          accessToken: action.payload.accessToken, 
          refreshToken: action.payload.refreshToken,
          ...action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default loginReducer;