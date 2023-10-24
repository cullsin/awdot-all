import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_PRODUCT_REQUEST,
    INSERT_PRODUCT_SUCCESS,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    LIST_PRODUCT_REQUEST,
    LIST_PRODUCT_SUCCESS,
    COMPANIES_PRODUCT_REQUEST,
    COMPANIES_PRODUCT_SUCCESS,
    REMOVE_PRODUCT_REQUEST,
    REMOVE_PRODUCT_SUCCESS
} from '../../actionTypes/product';

import { doInsertProduct, doGetProduct,
    doListProduct, doRemoveProduct,
    doCompaniesProduct } from '../../../com/product';
    

function* insertProductFetch(params) {
    const json = yield call(doInsertProduct, params.payload);   
    yield put({ type: INSERT_PRODUCT_SUCCESS, payload: json.data});
}

function* getProductFetch(params) {
    const json = yield call(doGetProduct, params.payload);   
    yield put({ type: GET_PRODUCT_SUCCESS, payload: json.data});
}

function* listProductFetch(params) {
    const json = yield call(doListProduct, params.payload);
    yield put({ type: LIST_PRODUCT_SUCCESS, payload: json.data});
}

function*  companiesProductFetch(params) {
    const json = yield call(doCompaniesProduct, params.payload);   
    yield put({ type: COMPANIES_PRODUCT_SUCCESS, payload: json.data});
}

function* removeProductFetch(params) {
    const json = yield call(doRemoveProduct, params.payload);   
    yield put({ type: REMOVE_PRODUCT_SUCCESS, payload: json.data});
}

export function* insertProductSaga() {
    yield takeLatest(INSERT_PRODUCT_REQUEST, insertProductFetch)
}

export function* removeProductSaga() {
    yield takeLatest(REMOVE_PRODUCT_REQUEST, removeProductFetch)
}

export function* getProductSaga() {
    yield takeLatest(GET_PRODUCT_REQUEST, getProductFetch)
}

export function* companiesProductSaga() {
    yield takeLatest(COMPANIES_PRODUCT_REQUEST, companiesProductFetch)
}

export function* listProductSaga() {
    yield takeLatest(LIST_PRODUCT_REQUEST, listProductFetch)
}