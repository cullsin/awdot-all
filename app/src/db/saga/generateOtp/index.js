import {call, put, takeLatest} from 'redux-saga/effects';
import {GENERATE_OTP_USER_REQUEST, GENERATE_OTP_USER_SUCCESS} from '../../actionTypes/generateOtp';
import { generateOtp } from '../../../com/user';

function* fetchGenerateOtp(params) {
    const json = yield call(generateOtp, params.payload);    
    yield put({ type: GENERATE_OTP_USER_SUCCESS, payload: json.data});
}

function* generateOtpSaga() {
    yield takeLatest(GENERATE_OTP_USER_REQUEST, fetchGenerateOtp)
}

export default generateOtpSaga;