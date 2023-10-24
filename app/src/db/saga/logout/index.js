import {put, takeLatest} from 'redux-saga/effects';
import {LOGOUT_REQUEST} from '../../actionTypes/logout';

function* setlogOut(params) {
    yield put({ type: LOGOUT_SUCCESS, payload: undefined });
}

function* logoutSaga() {
    yield takeLatest(LOGOUT_REQUEST, setlogOut)
}

export default loginSaga;