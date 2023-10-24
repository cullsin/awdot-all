import { GENERATE_OTP_USER_REQUEST, GENERATE_OTP_USER_SUCCESS
} from '../../actionTypes/generateOtp';

export const generateOtpRequest = (params) => {
return {
  type: GENERATE_OTP_USER_REQUEST,
  payload:params
};
};

export const generateOtpSuccess = () => {
return {
  type: GENERATE_OTP_USER_SUCCESS
};
};
