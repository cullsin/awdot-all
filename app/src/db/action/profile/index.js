import { 
    CREATE_PROFILE_REQUEST,
    USER_PROFILE_REQUEST,
    UPDATE_PROFILE_REQUEST
} from '../../actionTypes/profile';

export const createProfileRequest = (params) => {
return {
  type: CREATE_PROFILE_REQUEST,
  payload:params
};
};

export const userProfileRequest = (params) => {
return {
  type: USER_PROFILE_REQUEST,
  payload:params
};
};

export const updateProfileRequest = (params) => {
    return {
      type: UPDATE_PROFILE_REQUEST,
      payload:params
    };
};