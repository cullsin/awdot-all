import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_WALLET_REQUEST,
    INSERT_WALLET_SUCCESS,
    GET_WALLET_REQUEST,
    GET_WALLET_SUCCESS,
    USER_WALLET_REQUEST,
    USER_WALLET_SUCCESS,
    UPDATE_WALLET_REQUEST,
    UPDATE_WALLET_SUCCESS,
    INSERT_WALLET_HISTORY_REQUEST,
    INSERT_WALLET_HISTORY_SUCCESS,
    USER_WALLET_HISTORY_REQUEST,
    USER_WALLET_HISTORY_SUCCESS
} from '../../actionTypes/wallet';

import { doGetWallet, doInsertWallet, 
    doInsertWalletHistory, doUpdateWallet,
doUserWallet, doUserWalletHistory  } from '../../../com/wallet';

function* insertWalletFetch(params) {
    const json = yield call(doInsertWallet, params.payload);   
    yield put({ type: INSERT_WALLET_SUCCESS, payload: json.data});
}

function* insertWalletHistoryFetch(params) {
    const json = yield call(doInsertWalletHistory, params.payload);   
    yield put({ type: INSERT_WALLET_HISTORY_SUCCESS, payload: json.data});
}

function* getWalletFetch(params) {
    const json = yield call(doGetWallet, params.payload);   
    yield put({ type: GET_WALLET_SUCCESS, payload: json.data});
}

function*  userWalletFetch(params) {
    const json = yield call(doUserWallet, params.payload);   
    yield put({ type: USER_WALLET_SUCCESS, payload: json.data});
}

function*  userWalletHistoryFetch(params) {
    const json = yield call(doUserWalletHistory, params.payload);   
    yield put({ type: USER_WALLET_HISTORY_SUCCESS, payload: json.data});
}

function*  updateWalletFetch(params) {
    const json = yield call(doUpdateWallet, params.payload);   
    yield put({ type: UPDATE_WALLET_SUCCESS, payload: json.data});
}

export function* insertWalletSaga() {
    yield takeLatest(INSERT_WALLET_REQUEST, insertWalletFetch)
}

export function* insertWalletHistorySaga() {
    yield takeLatest(INSERT_WALLET_HISTORY_REQUEST, insertWalletHistoryFetch)
}

export function* getWalletSaga() {
    yield takeLatest(GET_WALLET_REQUEST, getWalletFetch)
}

export function* userWalletSaga() {
    yield takeLatest(USER_WALLET_REQUEST, userWalletFetch)
}

export function* userWalletHistorySaga() {
    yield takeLatest(USER_WALLET_HISTORY_REQUEST, userWalletHistoryFetch)
}

export function* updateWalletSaga() {
    yield takeLatest(UPDATE_WALLET_REQUEST, updateWalletFetch)
}
