import {call, put, takeLatest} from 'redux-saga/effects';
import {
    GET_GDB_COMPANIES_REQUEST,
    GET_GDB_COMPANIES_SUCCESS,
    LIST_GDB_COMPANIES_REQUEST,
    LIST_GDB_COMPANIES_SUCCESS,
    SEARCH_GDB_COMPANIES_REQUEST,
    SEARCH_GDB_COMPANIES_SUCCESS,
    MAIL_GDB_COMPANIES_REQUEST,
    MAIL_GDB_COMPANIES_SUCCESS
} from '../../actionTypes/gdb';

import { doGetGDBCompanies, doSearchGDBCompanies, doListGDBCompanies, doMailGDBCompanies } from '../../../com/gdb';   

function* getGDBCompaniesFetch(params) {
    const json = yield call(doGetGDBCompanies, params.payload);   
    yield put({ type: GET_GDB_COMPANIES_SUCCESS, payload: json.data});
}


function* mailGDBCompaniesFetch(params) {
    const json = yield call(doMailGDBCompanies, params.payload);   
    yield put({ type: MAIL_GDB_COMPANIES_SUCCESS, payload: json.data});
}
function* listGDBCompaniesFetch(params) {
    const json = yield call(doListGDBCompanies, params.payload);
    yield put({ type: LIST_GDB_COMPANIES_SUCCESS, payload: json.data});
}

function*  searchGDBCompaniesFetch(params) {
    const json = yield call(doSearchGDBCompanies, params.payload);   
    yield put({ type: SEARCH_GDB_COMPANIES_SUCCESS, payload: json.data});
}

export function* getGDBCompaniesSaga() {
    yield takeLatest(GET_GDB_COMPANIES_REQUEST, getGDBCompaniesFetch)
}

export function* mailGDBCompaniesSaga() {
    yield takeLatest(MAIL_GDB_COMPANIES_REQUEST, mailGDBCompaniesFetch)
}

export function* listGDBCompaniesSaga() {
    yield takeLatest(LIST_GDB_COMPANIES_REQUEST, listGDBCompaniesFetch)
}

export function* searchGDBCompaniesSaga() {
    yield takeLatest(SEARCH_GDB_COMPANIES_REQUEST, searchGDBCompaniesFetch)
}