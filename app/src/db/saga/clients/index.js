import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_CLIENTS_REQUEST,
    INSERT_CLIENTS_SUCCESS,
    GET_CLIENTS_REQUEST,
    GET_CLIENTS_SUCCESS,
    LIST_CLIENTS_REQUEST,
    LIST_CLIENTS_SUCCESS,
    PARTNERS_CLIENTS_REQUEST,
    PARTNERS_CLIENTS_SUCCESS,
    REMOVE_CLIENTS_REQUEST,
    REMOVE_CLIENTS_SUCCESS
} from '../../actionTypes/clients';

import { doInsertClients, doGetClients,
    doListClients, doRemoveClients,
    doPartnersClients } from '../../../com/clients';
    

function* insertClientsFetch(params) {
    const json = yield call(doInsertClients, params.payload);   
    yield put({ type: INSERT_CLIENTS_SUCCESS, payload: json.data});
}

function* getClientsFetch(params) {
    const json = yield call(doGetClients, params.payload);   
    yield put({ type: GET_CLIENTS_SUCCESS, payload: json.data});
}

function* listClientsFetch(params) {
    const json = yield call(doListClients, params.payload);
    yield put({ type: LIST_CLIENTS_SUCCESS, payload: json.data});
}

function*  partnersClientsFetch(params) {
    const json = yield call(doPartnersClients, params.payload);   
    yield put({ type: PARTNERS_CLIENTS_SUCCESS, payload: json.data});
}

function* removeClientsFetch(params) {
    const json = yield call(doRemoveClients, params.payload);   
    yield put({ type: REMOVE_CLIENTS_SUCCESS, payload: json.data});
}

export function* insertClientsSaga() {
    yield takeLatest(INSERT_CLIENTS_REQUEST, insertClientsFetch)
}

export function* removeClientsSaga() {
    yield takeLatest(REMOVE_CLIENTS_REQUEST, removeClientsFetch)
}

export function* getClientsSaga() {
    yield takeLatest(GET_CLIENTS_REQUEST, getClientsFetch)
}

export function* partnersClientsSaga() {
    yield takeLatest(PARTNERS_CLIENTS_REQUEST, partnersClientsFetch)
}

export function* listClientsSaga() {
    yield takeLatest(LIST_CLIENTS_REQUEST, listClientsFetch)
}