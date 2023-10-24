import {call, put, takeLatest} from 'redux-saga/effects';
import {FORGET_USER_REQUEST, FORGET_USER_SUCCESS} from '../../actionTypes/forgetPassword';
import { forgetPassword } from '../../../com/user';

function* fetchForgetPassword(params) {
    const json = yield call(forgetPassword, params.payload);   
    yield put({ type: FORGET_USER_SUCCESS, payload: json.data});
}

function* forgetPasswordSaga() {
    yield takeLatest(FORGET_USER_REQUEST, fetchForgetPassword)
}

export default forgetPasswordSaga;