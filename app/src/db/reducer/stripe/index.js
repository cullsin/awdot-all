import {  
    GENERATE_STRIPE_CLIENT_KEY_REQUEST,
    GENERATE_STRIPE_CLIENT_KEY_SUCCESS,
    STRIPE_RETURN_RESPONSE_REQUEST,
    STRIPE_RETURN_RESPONSE_SUCCESS,
    STRIPE_TRANSFER_REQUEST,
    STRIPE_TRANSFER_SUCCESS
  } from '../../actionTypes/stripe';
  
  const stripeReducer = (state = {}, action) => {
    switch (action.type) {  
      case STRIPE_TRANSFER_REQUEST:
        state = { ...state, transfer: {} };
        break;
      case GENERATE_STRIPE_CLIENT_KEY_REQUEST:
        state = { ...state, client: {} };
        break;
      case STRIPE_RETURN_RESPONSE_REQUEST:
        state = { ...state, response: {} };
        break;      
      case GENERATE_STRIPE_CLIENT_KEY_SUCCESS:
        state = { ...state,
                  client:{
                      ...action.payload  
                  }
              };
        break;
      case STRIPE_TRANSFER_SUCCESS:
        state = { ...state,
                  transfer:{
                      ...action.payload  
                  }
              };
      break;
      case STRIPE_RETURN_RESPONSE_SUCCESS:
        state = { ...state,
                  response:{
                      ...action.payload  
                  }
              };
      break;  
      default:
        break;
    }
    return state;
  };
  
  export default stripeReducer;