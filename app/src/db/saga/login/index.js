import {call, put, takeLatest} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_SUCCESS} from '../../actionTypes/login';
import { checkLogin } from '../../../com/login';

function* fetchLogin(params) {
    const json = yield call(checkLogin, params.payload);    
    yield put({ type: LOGIN_SUCCESS, payload: json.data});
}

function* loginSaga() {
    yield takeLatest(LOGIN_REQUEST, fetchLogin)
}

export default loginSaga;