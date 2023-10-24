import {call, put, takeLatest} from 'redux-saga/effects';
import {ACTIVATE_USER_REQUEST, ACTIVATE_USER_SUCCESS} from '../../actionTypes/activateUser';
import { makeActive } from '../../../com/user';

function* fetchActivateUser(params) {
    const json = yield call(makeActive, params.payload);
    yield put({ type: ACTIVATE_USER_SUCCESS, payload: json.data});
}

function* activateUserSaga() {
    yield takeLatest(ACTIVATE_USER_REQUEST, fetchActivateUser)
}

export default activateUserSaga;