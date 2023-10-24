import {call, put, takeLatest} from 'redux-saga/effects';
import {USER_BY_EMAIL_REQUEST, USER_BY_EMAIL_SUCCESS} from '../../actionTypes/user';
import { getByEmail } from '../../../com/user';

function* fetchEmailByUser(params) {
    const json = yield call(getByEmail, params.payload);    
    yield put({ type: USER_BY_EMAIL_SUCCESS, payload: json.data});
}

export function* emailByUserSaga() {
    yield takeLatest(USER_BY_EMAIL_REQUEST, fetchEmailByUser)
}
