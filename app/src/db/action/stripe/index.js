import { 
    GENERATE_STRIPE_CLIENT_KEY_REQUEST,
    STRIPE_RETURN_RESPONSE_REQUEST,
    STRIPE_TRANSFER_REQUEST
} from '../../actionTypes/stripe';
  
export const generateStripeClientKeyRequest = (params) => {
  return {
    type: GENERATE_STRIPE_CLIENT_KEY_REQUEST,
    payload:params
  };
};

export const stripeReturnResponseRequest = (params) => {
  return {
    type: STRIPE_RETURN_RESPONSE_REQUEST,
    payload:params
  };
};

export const stripeTransferRequest = (params) => {
  return {
    type: STRIPE_TRANSFER_REQUEST,
    payload:params
  };
};
