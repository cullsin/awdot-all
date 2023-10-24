import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_REDEEM_REQUEST,
    INSERT_REDEEM_SUCCESS,
    UPDATE_REDEEM_REQUEST,
    UPDATE_REDEEM_SUCCESS,
    GET_REDEEM_REQUEST,
    GET_REDEEM_SUCCESS,
    USER_REDEEM_REQUEST,
    USER_REDEEM_SUCCESS,
    FEE_REDEEM_REQUEST,
    FEE_REDEEM_SUCCESS
} from '../../actionTypes/redeem';

import { doInsertRedeem, doGetRedeem,doUserRedeem, doFeeRedeem, doUpdateRedeem } from '../../../com/redeem';

function* insertRedeemFetch(params) {
    const json = yield call(doInsertRedeem, params.payload);   
    yield put({ type: INSERT_REDEEM_SUCCESS, payload: json.data});
}

function* updateRedeemFetch(params) {
    const json = yield call(doUpdateRedeem, params.payload);   
    yield put({ type: UPDATE_REDEEM_SUCCESS, payload: json.data});
}

function* getRedeemFetch(params) {
    const json = yield call(doGetRedeem, params.payload);   
    yield put({ type: GET_REDEEM_SUCCESS, payload: json.data});
}

function*  userRedeemFetch(params) {
    const json = yield call(doUserRedeem, params.payload);   
    yield put({ type: USER_REDEEM_SUCCESS, payload: json.data});
}

function*  feeRedeemFetch(params) {
    const json = yield call(doFeeRedeem, params.payload);   
    yield put({ type: FEE_REDEEM_SUCCESS, payload: json.data});
}

export function* insertRedeemSaga() {
    yield takeLatest(INSERT_REDEEM_REQUEST, insertRedeemFetch)
}

export function* updateRedeemSaga() {
    yield takeLatest(UPDATE_REDEEM_REQUEST, updateRedeemFetch)
}

export function* getRedeemSaga() {
    yield takeLatest(GET_REDEEM_REQUEST, getRedeemFetch)
}

export function* userRedeemSaga() {
    yield takeLatest(USER_REDEEM_REQUEST, userRedeemFetch)
}

export function* feeRedeemSaga() {
    yield takeLatest(FEE_REDEEM_REQUEST, feeRedeemFetch)
}

