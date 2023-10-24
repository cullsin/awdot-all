import {  
    CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS,
    USER_PROFILE_REQUEST,USER_PROFILE_SUCCESS,
    UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS
  } from '../../actionTypes/profile';
  
  const profileReducer = (state = {}, action) => {
    switch (action.type) {  
    case CREATE_PROFILE_REQUEST:
        state = { ...state, create: {} };
        break;
    case USER_PROFILE_REQUEST:
        state = { ...state, user: {} };
        break;
    case UPDATE_PROFILE_REQUEST:
        state = { ...state, create: {} };
        break;
    case CREATE_PROFILE_SUCCESS:
        state = { ...state, create: action.payload };
        break;
    case USER_PROFILE_SUCCESS:
        state = { ...state, user: action.payload };
        break;
    case UPDATE_PROFILE_SUCCESS:
        state = { ...state, create: action.payload };
        break;
    default:
        break;
    }
    return state;
  };
  export default profileReducer;