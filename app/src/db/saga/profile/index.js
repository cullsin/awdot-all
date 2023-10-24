import {call, put, takeLatest} from 'redux-saga/effects';
import {
    CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS,
    USER_PROFILE_REQUEST,USER_PROFILE_SUCCESS,
    UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS
} from '../../actionTypes/profile';

import { getProfileByUser, createProfile, updateProfile } from '../../../com/profile';

function* fetchUserProfile(params) {
    const json = yield call(getProfileByUser, params.payload);   
    yield put({ type: USER_PROFILE_SUCCESS, payload: json.data});
}

function* fetchCreateProfile(params) {
    const json = yield call(createProfile, params.payload);
    yield put({ type: CREATE_PROFILE_SUCCESS, payload: json.data});
}

function* fetchUpdateProfile(params) {
    const json = yield call(updateProfile, params.payload);
    yield put({ type: UPDATE_PROFILE_SUCCESS, payload: json.data});
}

export function* insertProfileSaga() {
    yield takeLatest(CREATE_PROFILE_REQUEST, fetchCreateProfile)
}

export function* updateProfileSaga() {
    yield takeLatest(UPDATE_PROFILE_REQUEST, fetchUpdateProfile)
}

export function* getProfileSaga() {
    yield takeLatest(USER_PROFILE_REQUEST, fetchUserProfile)
}