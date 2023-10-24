import { GET_TOKEN_REQUEST, 
    GET_TOKEN_SUCCESS, 
} from '../../actionTypes/token';

const tokenReducer = (state = {}, action) => {
    switch (action.type) {  
      case GET_TOKEN_REQUEST:
        state = { accessToken: undefined, refreshToken: undefined };
        break;
      case GET_TOKEN_SUCCESS:
        state = { ...state,  
            accessToken: action.payload.accessToken, 
            refreshToken: action.payload.refreshToken };
        break;
      default:
        break;
    }
    return state;
};

export default tokenReducer;