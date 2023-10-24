import {  FORGET_USER_REQUEST, FORGET_USER_SUCCESS 
} from '../../actionTypes/forgetPassword';

import {  ACTIVATE_USER_REQUEST, ACTIVATE_USER_SUCCESS 
} from '../../actionTypes/activateUser';

import {  GENERATE_OTP_USER_REQUEST, GENERATE_OTP_USER_SUCCESS 
} from '../../actionTypes/generateOtp';

import { USER_BY_EMAIL_REQUEST, USER_BY_EMAIL_SUCCESS 
} from '../../actionTypes/user';

const userReducer = (state = {}, action) => {
  switch (action.type) {  
    case FORGET_USER_REQUEST:
      state = { ...state, forget: {}};
      break;
    case ACTIVATE_USER_REQUEST:
        state = { ...state, activate: {}};
    break;  
    case GENERATE_OTP_USER_REQUEST:
      state = { ...state, generatedOtp: {}};
      break;
    case USER_BY_EMAIL_REQUEST:
      state = { ...state, userByEmail: {}};
      break;
    case FORGET_USER_SUCCESS:
      state = { ...state,
                forget: {
                    ...action.payload
                }  
           };
      break;
    case ACTIVATE_USER_SUCCESS:
    state = { ...state,
                activate: {
                    ...action.payload
                }  
            };
    break;
    case GENERATE_OTP_USER_SUCCESS:
        state = { ...state,
                    generatedOtp: {
                        ...action.payload
                    }  
                };
        break;
    case USER_BY_EMAIL_SUCCESS:
      state = { ...state,
              userByEmail: {
                      ...action.payload
                  }  
              };
      break;                
    default:
      break;
  }
  return state;
};

export default userReducer;