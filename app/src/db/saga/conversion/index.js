import {call, put, takeLatest} from 'redux-saga/effects';
import {CURRENCY_CONVERSION_REQUEST, CURRENCY_CONVERSION_SUCCESS} from '../../actionTypes/conversion';
import { currencyConversion } from '../../../com/conversion';

function* fetchConversion(params) {
    const json = yield call(currencyConversion, params.payload);    
    yield put({ type: CURRENCY_CONVERSION_SUCCESS, payload: json.data});
}

function* conversionSaga() {
    yield takeLatest(CURRENCY_CONVERSION_REQUEST, fetchConversion)
}

export default conversionSaga;