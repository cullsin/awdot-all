import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_DOMAIN_REQUEST,
    INSERT_DOMAIN_SUCCESS,
    UPDATE_DOMAIN_REQUEST,
    UPDATE_DOMAIN_SUCCESS,
    GET_DOMAIN_REQUEST,
    GET_DOMAIN_SUCCESS,
    LIST_DOMAIN_REQUEST,
    LIST_DOMAIN_SUCCESS,
    USER_DOMAIN_REQUEST,
    USER_DOMAIN_SUCCESS,
    REMOVE_DOMAIN_REQUEST,
    REMOVE_DOMAIN_SUCCESS,
    TYPE_DOMAIN_REQUEST,
    TYPE_DOMAIN_SUCCESS
} from '../../actionTypes/domain';

import { doInsertDomain, doGetDomain,doUpdateDomain,
    doListDomain, doRemoveDomain,
    doTypeDomain, doUserDomain } from '../../../com/domain';
function* insertDomainFetch(params) {
    const json = yield call(doInsertDomain, params.payload);   
    yield put({ type: INSERT_DOMAIN_SUCCESS, payload: json.data});
}

function* updateDomainFetch(params) {
    const json = yield call(doUpdateDomain, params.payload);   
    yield put({ type: UPDATE_DOMAIN_SUCCESS, payload: json.data});
}

function* getDomainFetch(params) {
    const json = yield call(doGetDomain, params.payload);   
    yield put({ type: GET_DOMAIN_SUCCESS, payload: json.data});
}

function* listDomainFetch(params) {
    const json = yield call(doListDomain, params.payload);  
    yield put({ type: LIST_DOMAIN_SUCCESS, payload: json.data});
}

function*  userDomainFetch(params) {
    const json = yield call(doUserDomain, params.payload);   
    yield put({ type: USER_DOMAIN_SUCCESS, payload: json.data});
}

function* removeDomainFetch(params) {
    const json = yield call(doRemoveDomain, params.payload);   
    yield put({ type: REMOVE_DOMAIN_SUCCESS, payload: json.data});
}

function*  TypeDomainFetch(params) {
    const json = yield call(doTypeDomain, params.payload);   
    yield put({ type: TYPE_DOMAIN_SUCCESS, payload: json.data});
}

export function* insertDomainSaga() {
    yield takeLatest(INSERT_DOMAIN_REQUEST, insertDomainFetch)
}

export function* updateDomainSaga() {
    yield takeLatest(UPDATE_DOMAIN_REQUEST, updateDomainFetch)
}

export function* removeDomainSaga() {
    yield takeLatest(REMOVE_DOMAIN_REQUEST, removeDomainFetch)
}

export function* getDomainSaga() {
    yield takeLatest(GET_DOMAIN_REQUEST, getDomainFetch)
}

export function* userDomainSaga() {
    yield takeLatest(USER_DOMAIN_REQUEST, userDomainFetch)
}

export function* listDomainSaga() {
    yield takeLatest(LIST_DOMAIN_REQUEST, listDomainFetch)
}

export function* TypeDomainSaga() {
    yield takeLatest(TYPE_DOMAIN_REQUEST, TypeDomainFetch)
}
