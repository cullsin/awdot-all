import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_PURCHASE_REQUEST,
    INSERT_PURCHASE_SUCCESS,
    UPDATE_PURCHASE_REQUEST,
    UPDATE_PURCHASE_SUCCESS,
    GET_PURCHASE_REQUEST,
    GET_PURCHASE_SUCCESS,
    USER_PURCHASE_REQUEST,
    USER_PURCHASE_SUCCESS,
    FEE_PURCHASE_REQUEST,
    FEE_PURCHASE_SUCCESS
} from '../../actionTypes/purchase';

import { doInsertPurchase, doGetPurchase,doUserPurchase, doFeePurchase, doUpdatePurchase } from '../../../com/purchase';

function* insertPurchaseFetch(params) {
    const json = yield call(doInsertPurchase, params.payload);   
    yield put({ type: INSERT_PURCHASE_SUCCESS, payload: json.data});
}

function* updatePurchaseFetch(params) {
    const json = yield call(doUpdatePurchase, params.payload);   
    yield put({ type: UPDATE_PURCHASE_SUCCESS, payload: json.data});
}

function* getPurchaseFetch(params) {
    const json = yield call(doGetPurchase, params.payload);   
    yield put({ type: GET_PURCHASE_SUCCESS, payload: json.data});
}

function*  userPurchaseFetch(params) {
    const json = yield call(doUserPurchase, params.payload);   
    yield put({ type: USER_PURCHASE_SUCCESS, payload: json.data});
}

function*  feePurchaseFetch(params) {
    const json = yield call(doFeePurchase, params.payload);   
    yield put({ type: FEE_PURCHASE_SUCCESS, payload: json.data});
}

export function* updatePurchaseSaga() {
    yield takeLatest(UPDATE_PURCHASE_REQUEST, updatePurchaseFetch)
}

export function* insertPurchaseSaga() {
    yield takeLatest(INSERT_PURCHASE_REQUEST, insertPurchaseFetch)
}

export function* getPurchaseSaga() {
    yield takeLatest(GET_PURCHASE_REQUEST, getPurchaseFetch)
}

export function* userPurchaseSaga() {
    yield takeLatest(USER_PURCHASE_REQUEST, userPurchaseFetch)
}

export function* feePurchaseSaga() {
    yield takeLatest(FEE_PURCHASE_REQUEST, feePurchaseFetch)
}
