import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_PARTNERS_REQUEST,
    INSERT_PARTNERS_SUCCESS,
    UPDATE_PARTNERS_REQUEST,
    UPDATE_PARTNERS_SUCCESS,
    GET_PARTNERS_REQUEST,
    GET_PARTNERS_SUCCESS,
    LIST_PARTNERS_REQUEST,
    LIST_PARTNERS_SUCCESS,
    USER_PARTNERS_REQUEST,
    USER_PARTNERS_SUCCESS,
    REMOVE_PARTNERS_REQUEST,
    REMOVE_PARTNERS_SUCCESS,
    INTERESTED_PARTNERS_REQUEST,
    INTERESTED_PARTNERS_SUCCESS
} from '../../actionTypes/partners';

import { doInsertPartners, doGetPartners,
    doListPartners, doRemovePartners,
    doInterestedPartners, doUserPartners, doUpdatePartners } from '../../../com/partners';

function* insertPartnersFetch(params) {
    const json = yield call(doInsertPartners, params.payload);   
    yield put({ type: INSERT_PARTNERS_SUCCESS, payload: json.data});
}

function* updatePartnersFetch(params) {
    const json = yield call(doUpdatePartners, params.payload);   
    yield put({ type: UPDATE_PARTNERS_SUCCESS, payload: json.data});
}

function* getPartnersFetch(params) {
    const json = yield call(doGetPartners, params.payload);   
    yield put({ type: GET_PARTNERS_SUCCESS, payload: json.data});
}

function* listPartnersFetch(params) {
    const json = yield call(doListPartners, params.payload);
    const partners = json.data.partnersList;  
    yield put({ type: LIST_PARTNERS_SUCCESS, payload: json.data});
}

function*  userPartnersFetch(params) {
    const json = yield call(doUserPartners, params.payload);   
    yield put({ type: USER_PARTNERS_SUCCESS, payload: json.data});
}

function* removePartnersFetch(params) {
    const json = yield call(doRemovePartners, params.payload);   
    yield put({ type: REMOVE_PARTNERS_SUCCESS, payload: json.data});
}

function*  interestedPartnersFetch(params) {
    const json = yield call(doInterestedPartners, params.payload);   
    yield put({ type: INTERESTED_PARTNERS_SUCCESS, payload: json.data});
}

export function* insertPartnersSaga() {
    yield takeLatest(INSERT_PARTNERS_REQUEST, insertPartnersFetch)
}

export function* updatePartnersSaga() {
    yield takeLatest(UPDATE_PARTNERS_REQUEST, updatePartnersFetch)
}

export function* removePartnersSaga() {
    yield takeLatest(REMOVE_PARTNERS_REQUEST, removePartnersFetch)
}

export function* getPartnersSaga() {
    yield takeLatest(GET_PARTNERS_REQUEST, getPartnersFetch)
}

export function* userPartnersSaga() {
    yield takeLatest(USER_PARTNERS_REQUEST, userPartnersFetch)
}

export function* listPartnersSaga() {
    yield takeLatest(LIST_PARTNERS_REQUEST, listPartnersFetch)
}

export function* interestedPartnersSaga() {
    yield takeLatest(INTERESTED_PARTNERS_REQUEST, interestedPartnersFetch)
}
