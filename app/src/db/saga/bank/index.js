import {call, put, takeLatest} from 'redux-saga/effects';
import {
    CREATE_BANK_REQUEST, CREATE_BANK_SUCCESS,
    GET_BANK_REQUEST,GET_BANK_SUCCESS,
    DELETE_BANK_REQUEST,DELETE_BANK_SUCCESS
} from '../../actionTypes/bank';

import { getBanks, insertBank, removeBank } from '../../../com/bank';

function* fetchGetBanks(params) {
    const json = yield call(getBanks, params.payload);   
    yield put({ type: GET_BANK_SUCCESS, payload: json.data});
}

function* fetchCreateBank(params) {
    const json = yield call(insertBank, params.payload);
    yield put({ type: CREATE_BANK_SUCCESS, payload: json.data});
}

function* fetchDeleteBank(params) {
    const json = yield call(removeBank, params.payload);
    yield put({ type: DELETE_BANK_SUCCESS, payload: json.data});
}

export function* insertBankSaga() {
    yield takeLatest(CREATE_BANK_REQUEST, fetchCreateBank)
}

export function* removeBankSaga() {
    yield takeLatest(DELETE_BANK_REQUEST, fetchDeleteBank)
}

export function* getBankSaga() {
    yield takeLatest(GET_BANK_REQUEST, fetchGetBanks)
}