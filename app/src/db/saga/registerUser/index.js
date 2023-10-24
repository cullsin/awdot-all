import {call, put, takeLatest} from 'redux-saga/effects';
import {CREATE_USER_REGISTER_REQUEST, GET_USER_REGISTER_SUCCESS} from '../../actionTypes/registerUser';
import {createUserRegister} from '../../../com/registerUser';

function* fetchRegisterUser(params) {
    const json = yield call(createUserRegister, params.payload);
    yield put({ type: GET_USER_REGISTER_SUCCESS, payload: json.data});
}

function* registerUserSaga() {
    yield takeLatest(CREATE_USER_REGISTER_REQUEST, fetchRegisterUser)
}

export default registerUserSaga;