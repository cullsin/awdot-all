import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_INVESTMENT_REQUEST,
    INSERT_INVESTMENT_SUCCESS,
    UPDATE_INVESTMENT_REQUEST,
    UPDATE_INVESTMENT_SUCCESS,
    GET_INVESTMENT_REQUEST,
    GET_INVESTMENT_SUCCESS,
    LIST_INVESTMENT_REQUEST,
    LIST_INVESTMENT_SUCCESS,
    USER_INVESTMENT_REQUEST,
    USER_INVESTMENT_SUCCESS,
    REMOVE_INVESTMENT_REQUEST,
    REMOVE_INVESTMENT_SUCCESS,
    INTERESTED_INVESTMENT_REQUEST,
    INTERESTED_INVESTMENT_SUCCESS
} from '../../actionTypes/investment';

import { doInsertInvestment, doGetInvestment,doUpdateInvestment,
    doListInvestment, doRemoveInvestment,
    doInterestedInvestment, doUserInvestment } from '../../../com/investment';
import { doInvestmentShares } from '../../../com/shares';
function* insertInvestmentFetch(params) {
    const json = yield call(doInsertInvestment, params.payload);   
    yield put({ type: INSERT_INVESTMENT_SUCCESS, payload: json.data});
}

function* updateInvestmentFetch(params) {
    const json = yield call(doUpdateInvestment, params.payload);   
    yield put({ type: UPDATE_INVESTMENT_SUCCESS, payload: json.data});
}

function* getInvestmentFetch(params) {
    const json = yield call(doGetInvestment, params.payload);   
    yield put({ type: GET_INVESTMENT_SUCCESS, payload: json.data});
}

function* listInvestmentFetch(params) {
    const json = yield call(doListInvestment, params.payload);  
    const {investments} = json.data;
    for (let index = 0; index < investments.length; index++) {
        const sharesResponse =  yield call(doInvestmentShares, {investment_id: investments[index].companies_id});
        investments[index].shares = sharesResponse.data.shares ? sharesResponse.data.shares : {};
    } 
    yield put({ type: LIST_INVESTMENT_SUCCESS, payload: json.data});
}

function*  userInvestmentFetch(params) {
    const json = yield call(doUserInvestment, params.payload);   
    yield put({ type: USER_INVESTMENT_SUCCESS, payload: json.data});
}

function* removeInvestmentFetch(params) {
    const json = yield call(doRemoveInvestment, params.payload);   
    yield put({ type: REMOVE_INVESTMENT_SUCCESS, payload: json.data});
}

function*  interestedInvestmentFetch(params) {
    const json = yield call(doInterestedInvestment, params.payload);   
    yield put({ type: INTERESTED_INVESTMENT_SUCCESS, payload: json.data});
}

export function* insertInvestmentSaga() {
    yield takeLatest(INSERT_INVESTMENT_REQUEST, insertInvestmentFetch)
}

export function* updateInvestmentSaga() {
    yield takeLatest(UPDATE_INVESTMENT_REQUEST, updateInvestmentFetch)
}

export function* removeInvestmentSaga() {
    yield takeLatest(REMOVE_INVESTMENT_REQUEST, removeInvestmentFetch)
}

export function* getInvestmentSaga() {
    yield takeLatest(GET_INVESTMENT_REQUEST, getInvestmentFetch)
}

export function* userInvestmentSaga() {
    yield takeLatest(USER_INVESTMENT_REQUEST, userInvestmentFetch)
}

export function* listInvestmentSaga() {
    yield takeLatest(LIST_INVESTMENT_REQUEST, listInvestmentFetch)
}

export function* interestedInvestmentSaga() {
    yield takeLatest(INTERESTED_INVESTMENT_REQUEST, interestedInvestmentFetch)
}
