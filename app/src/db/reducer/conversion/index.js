import {  
    CURRENCY_CONVERSION_REQUEST, 
    CURRENCY_CONVERSION_SUCCESS 
} from '../../actionTypes/conversion';

const conversionReducer = (state = {}, action) => {
  switch (action.type) {  
    case CURRENCY_CONVERSION_REQUEST:
      state = { ...state, conversion: {} };
      break;
    case CURRENCY_CONVERSION_SUCCESS:
      state = { ...state,  
                conversion:{...action.payload} };
      break;
    default:
      break;
  }
  return state;
};

export default conversionReducer;