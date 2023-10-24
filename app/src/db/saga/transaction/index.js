import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_TRANSACTION_REQUEST,
    INSERT_TRANSACTION_SUCCESS,
    GET_TRANSACTION_REQUEST,
    GET_TRANSACTION_SUCCESS,
    USER_TRANSACTION_REQUEST,
    USER_TRANSACTION_SUCCESS
} from '../../actionTypes/transaction';

import { doInsertTransaction, doGetTransaction, doUserTransaction } from '../../../com/transaction';

function* insertTransactionFetch(params) {
    const json = yield call(doInsertTransaction, params.payload);   
    yield put({ type: INSERT_TRANSACTION_SUCCESS, payload: json.data});
}

function* getTransactionFetch(params) {
    const json = yield call(doGetTransaction, params.payload);   
    yield put({ type: GET_TRANSACTION_SUCCESS, payload: json.data});
}

function*  userTransactionFetch(params) {
    const json = yield call(doUserTransaction, params.payload);   
    yield put({ type: USER_TRANSACTION_SUCCESS, payload: json.data});
}

export function* insertTransactionSaga() {
    yield takeLatest(INSERT_TRANSACTION_REQUEST, insertTransactionFetch)
}

export function* getTransactionSaga() {
    yield takeLatest(GET_TRANSACTION_REQUEST, getTransactionFetch)
}

export function* userTransactionSaga() {
    yield takeLatest(USER_TRANSACTION_REQUEST, userTransactionFetch)
}

