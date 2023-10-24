import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_INTEREST_REQUEST,
    INSERT_INTEREST_SUCCESS,
    GET_INTEREST_REQUEST,
    GET_INTEREST_SUCCESS,
    LIST_INTEREST_REQUEST,
    LIST_INTEREST_SUCCESS,
    PARTNERS_INTEREST_REQUEST,
    PARTNERS_INTEREST_SUCCESS,
    REMOVE_INTEREST_REQUEST,
    REMOVE_INTEREST_SUCCESS
} from '../../actionTypes/interest';

import { doInsertInterest, doGetInterest,
    doListInterest, doRemoveInterest,
    doPartnersInterest } from '../../../com/interest';

function* insertInterestFetch(params) {
    const json = yield call(doInsertInterest, params.payload);   
    yield put({ type: INSERT_INTEREST_SUCCESS, payload: json.data});
}

function* getInterestFetch(params) {
    const json = yield call(doGetInterest, params.payload);   
    yield put({ type: GET_INTEREST_SUCCESS, payload: json.data});
}

function* listInterestFetch(params) {
    const json = yield call(doListInterest, params.payload);
    yield put({ type: LIST_INTEREST_SUCCESS, payload: json.data});
}

function*  partnersInterestFetch(params) {
    const json = yield call(doPartnersInterest, params.payload);   
    yield put({ type: PARTNERS_INTEREST_SUCCESS, payload: json.data});
}

function* removeInterestFetch(params) {
    const json = yield call(doRemoveInterest, params.payload);   
    yield put({ type: REMOVE_INTEREST_SUCCESS, payload: json.data});
}

export function* insertInterestSaga() {
    yield takeLatest(INSERT_INTEREST_REQUEST, insertInterestFetch)
}

export function* removeInterestSaga() {
    yield takeLatest(REMOVE_INTEREST_REQUEST, removeInterestFetch)
}

export function* getInterestSaga() {
    yield takeLatest(GET_INTEREST_REQUEST, getInterestFetch)
}

export function* partnersInterestSaga() {
    yield takeLatest(PARTNERS_INTEREST_REQUEST, partnersInterestFetch)
}

export function* listInterestSaga() {
    yield takeLatest(LIST_INTEREST_REQUEST, listInterestFetch)
}