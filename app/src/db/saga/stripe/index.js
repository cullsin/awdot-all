import {call, put, takeLatest} from 'redux-saga/effects';
import { 
    GENERATE_STRIPE_CLIENT_KEY_REQUEST, 
    GENERATE_STRIPE_CLIENT_KEY_SUCCESS,
    STRIPE_RETURN_RESPONSE_REQUEST,
    STRIPE_RETURN_RESPONSE_SUCCESS,
    STRIPE_TRANSFER_REQUEST,
    STRIPE_TRANSFER_SUCCESS
} from '../../actionTypes/stripe';
import { generateStripeClientKey, stripeReturnResponse, doStripeTransfer } from '../../../com/stripe';

function* fetchGenStripeClientKey(params) {
    const json = yield call(generateStripeClientKey, params.payload);    
    yield put({ type: GENERATE_STRIPE_CLIENT_KEY_SUCCESS, payload: json.data});
}

export function* generateStripeClientKeySaga() {
    yield takeLatest(GENERATE_STRIPE_CLIENT_KEY_REQUEST, fetchGenStripeClientKey)
}

function* fetchStripeReturnResponse(params) {
    const json = yield call(stripeReturnResponse, params.payload);    
    yield put({ type: STRIPE_RETURN_RESPONSE_SUCCESS, payload: json.data});
}

export function* stripeReturnResponseSaga() {
    yield takeLatest(STRIPE_RETURN_RESPONSE_REQUEST, fetchStripeReturnResponse)
}

function* fetchStripeTransfer(params) {
    const json = yield call(doStripeTransfer, params.payload);    
    yield put({ type: STRIPE_TRANSFER_SUCCESS, payload: json.data});
}

export function* stripeTransferSaga() {
    yield takeLatest(STRIPE_TRANSFER_REQUEST, fetchStripeTransfer)
}