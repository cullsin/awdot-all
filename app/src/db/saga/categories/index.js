import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_CATEGORIES_REQUEST,
    INSERT_CATEGORIES_SUCCESS,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    LIST_CATEGORIES_REQUEST,
    LIST_CATEGORIES_SUCCESS,
    COMPANIES_CATEGORIES_REQUEST,
    COMPANIES_CATEGORIES_SUCCESS,
    REMOVE_CATEGORIES_REQUEST,
    REMOVE_CATEGORIES_SUCCESS
} from '../../actionTypes/categories';

import { doInsertCategories, doGetCategories,
    doListCategories, doRemoveCategories,
    doCompaniesCategories } from '../../../com/categories';

function* insertCategoriesFetch(params) {
    const json = yield call(doInsertCategories, params.payload);   
    yield put({ type: INSERT_CATEGORIES_SUCCESS, payload: json.data});
}

function* getCategoriesFetch(params) {
    const json = yield call(doGetCategories, params.payload);   
    yield put({ type: GET_CATEGORIES_SUCCESS, payload: json.data});
}

function* listCategoriesFetch(params) {
    const json = yield call(doListCategories, params.payload);
    yield put({ type: LIST_CATEGORIES_SUCCESS, payload: json.data});
}

function*  companiesCategoriesFetch(params) {
    const json = yield call(doCompaniesCategories, params.payload);   
    yield put({ type: COMPANIES_CATEGORIES_SUCCESS, payload: json.data});
}

function* removeCategoriesFetch(params) {
    const json = yield call(doRemoveCategories, params.payload);   
    yield put({ type: REMOVE_CATEGORIES_SUCCESS, payload: json.data});
}

export function* insertCategoriesSaga() {
    yield takeLatest(INSERT_CATEGORIES_REQUEST, insertCategoriesFetch)
}

export function* removeCategoriesSaga() {
    yield takeLatest(REMOVE_CATEGORIES_REQUEST, removeCategoriesFetch)
}

export function* getCategoriesSaga() {
    yield takeLatest(GET_CATEGORIES_REQUEST, getCategoriesFetch)
}

export function* companiesCategoriesSaga() {
    yield takeLatest(COMPANIES_CATEGORIES_REQUEST, companiesCategoriesFetch)
}

export function* listCategoriesSaga() {
    yield takeLatest(LIST_CATEGORIES_REQUEST, listCategoriesFetch)
}