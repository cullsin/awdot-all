import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_SHARES_REQUEST,
    INSERT_SHARES_SUCCESS,
    GET_SHARES_REQUEST,
    GET_SHARES_SUCCESS,
    USER_SHARES_REQUEST,
    USER_SHARES_SUCCESS,
    UPDATE_SHARES_REQUEST,
    UPDATE_SHARES_SUCCESS,
    BOUGHT_SHARES_REQUEST,
    BOUGHT_SHARES_SUCCESS,
    COMPANIES_SHARES_REQUEST,
    COMPANIES_SHARES_SUCCESS
} from '../../actionTypes/shares';

import { doInsertShares, doGetShares, doUpdateShares,
     doUserShares, doBoughtShares, doCompaniesShares } from '../../../com/shares';

import { doGetCompanies } from '../../../com/companies';
   

function* insertSharesFetch(params) {
    const json = yield call(doInsertShares, params.payload);   
    yield put({ type: INSERT_SHARES_SUCCESS, payload: json.data});
}

function* getSharesFetch(params) {
    const json = yield call(doGetShares, params.payload);   
    yield put({ type: GET_SHARES_SUCCESS, payload: json.data});
}

function* companiesSharesFetch(params) {
    const json = yield call(doCompaniesShares, params.payload);   
    yield put({ type: COMPANIES_SHARES_SUCCESS, payload: json.data});
}

function*  userSharesFetch(params) {
    const json = yield call(doUserShares, params.payload);  
    const {shares} = json.data;
    for (let index = 0; index < shares.length; index++) {
        const compaiesResponse =  yield call(doGetCompanies, {companies_id: shares[index].companies_id});
        shares[index].companies = compaiesResponse.data.company ? compaiesResponse.data.company : {};
    } 
    yield put({ type: USER_SHARES_SUCCESS, payload: json.data});
}

function*  updateSharesFetch(params) {
    const json = yield call(doUpdateShares, params.payload);   
    yield put({ type: UPDATE_SHARES_SUCCESS, payload: json.data});
}

function*  boughtSharesFetch(params) {
    const json = yield call(doBoughtShares, params.payload);   
    yield put({ type: BOUGHT_SHARES_SUCCESS, payload: json.data});
}

export function* insertSharesSaga() {
    yield takeLatest(INSERT_SHARES_REQUEST, insertSharesFetch)
}

export function* getSharesSaga() {
    yield takeLatest(GET_SHARES_REQUEST, getSharesFetch)
}

export function* companiesSharesSaga() {
    yield takeLatest(COMPANIES_SHARES_REQUEST, companiesSharesFetch)
}

export function* userSharesSaga() {
    yield takeLatest(USER_SHARES_REQUEST, userSharesFetch)
}

export function* updateSharesSaga() {
    yield takeLatest(UPDATE_SHARES_REQUEST, updateSharesFetch)
}

export function* boughtSharesSaga() {
    yield takeLatest(BOUGHT_SHARES_REQUEST, boughtSharesFetch)
}
