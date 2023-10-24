import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_COMPANIES_REQUEST,
    INSERT_COMPANIES_SUCCESS,
    UPDATE_COMPANIES_REQUEST,
    UPDATE_COMPANIES_SUCCESS,
    GET_COMPANIES_REQUEST,
    GET_COMPANIES_SUCCESS,
    LIST_COMPANIES_REQUEST,
    LIST_COMPANIES_SUCCESS,
    USER_COMPANIES_REQUEST,
    USER_COMPANIES_SUCCESS,
    REMOVE_COMPANIES_REQUEST,
    REMOVE_COMPANIES_SUCCESS,
    INTERESTED_COMPANIES_REQUEST,
    INTERESTED_COMPANIES_SUCCESS
} from '../../actionTypes/companies';

import { doInsertCompanies, doGetCompanies,
    doListCompanies, doRemoveCompanies,
    doInterestedCompanies, doUserCompanies, doUpdateCompanies } from '../../../com/companies';
import { doCompaniesShares } from '../../../com/shares';    
import { doTypeDomain } from '../../../com/domain'

function* insertCompaniesFetch(params) {
    const json = yield call(doInsertCompanies, params.payload);   
    yield put({ type: INSERT_COMPANIES_SUCCESS, payload: json.data});
}

function* updateCompaniesFetch(params) {
    const json = yield call(doUpdateCompanies, params.payload);   
    yield put({ type: UPDATE_COMPANIES_SUCCESS, payload: json.data});
}

function* getCompaniesFetch(params) {
    const json = yield call(doGetCompanies, params.payload);   
    yield put({ type: GET_COMPANIES_SUCCESS, payload: json.data});
}

function* listCompaniesFetch(params) {
    const json = yield call(doListCompanies, params.payload);
    const companies = json.data.companiesList;
    for (let index = 0; index < companies.length; index++) {
        const sharesResponse =  yield call(doCompaniesShares, {companies_id: companies[index].companies_id});
        companies[index].share = sharesResponse.data.share ? sharesResponse.data.share : {};
        const domainResponse =  yield call(doTypeDomain, {type_id: companies[index].companies_id});
        companies[index].domain = domainResponse.data.domain ? domainResponse.data.domain : {};
    }  
    yield put({ type: LIST_COMPANIES_SUCCESS, payload: json.data});
}

function*  userCompaniesFetch(params) {
    const json = yield call(doUserCompanies, params.payload);   
    yield put({ type: USER_COMPANIES_SUCCESS, payload: json.data});
}

function* removeCompaniesFetch(params) {
    const json = yield call(doRemoveCompanies, params.payload);   
    yield put({ type: REMOVE_COMPANIES_SUCCESS, payload: json.data});
}

function*  interestedCompaniesFetch(params) {
    const json = yield call(doInterestedCompanies, params.payload);   
    yield put({ type: INTERESTED_COMPANIES_SUCCESS, payload: json.data});
}

export function* insertCompaniesSaga() {
    yield takeLatest(INSERT_COMPANIES_REQUEST, insertCompaniesFetch)
}

export function* updateCompaniesSaga() {
    yield takeLatest(UPDATE_COMPANIES_REQUEST, updateCompaniesFetch)
}

export function* removeCompaniesSaga() {
    yield takeLatest(REMOVE_COMPANIES_REQUEST, removeCompaniesFetch)
}

export function* getCompaniesSaga() {
    yield takeLatest(GET_COMPANIES_REQUEST, getCompaniesFetch)
}

export function* userCompaniesSaga() {
    yield takeLatest(USER_COMPANIES_REQUEST, userCompaniesFetch)
}

export function* listCompaniesSaga() {
    yield takeLatest(LIST_COMPANIES_REQUEST, listCompaniesFetch)
}

export function* interestedCompaniesSaga() {
    yield takeLatest(INTERESTED_COMPANIES_REQUEST, interestedCompaniesFetch)
}
