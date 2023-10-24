import {call, put, takeLatest} from 'redux-saga/effects';
import { GET_TOKEN_REQUEST,GET_TOKEN_SUCCESS} from '../../actionTypes/token';
import {getToken} from '../../../com/auth';

function* fetchToken() {
    const json = yield call(getToken);    
    yield put({ type: GET_TOKEN_SUCCESS, payload: json.data});
}

function* tokenSaga() {
    yield takeLatest(GET_TOKEN_REQUEST, fetchToken);
}

export default tokenSaga;