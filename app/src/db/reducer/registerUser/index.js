import { CREATE_USER_REGISTER_REQUEST, GET_USER_REGISTER_SUCCESS 
} from '../../actionTypes/registerUser';

const registerUserReducer = (state = {}, action) => {
    switch (action.type) {  
      case CREATE_USER_REGISTER_REQUEST:
        state = { };
        break;
      case GET_USER_REGISTER_SUCCESS:
        state = { ...state,  
                  ...action.payload };
        break;
      default:
        break;
    }
    return state;
};

export default registerUserReducer;