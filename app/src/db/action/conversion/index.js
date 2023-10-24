import { 
    CURRENCY_CONVERSION_REQUEST
} from '../../actionTypes/conversion';

export const currencyConversionRequest = (params) => {
return {
  type: CURRENCY_CONVERSION_REQUEST,
  payload:params
};
};