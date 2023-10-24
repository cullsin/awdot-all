import {call, put, takeLatest, select, take} from 'redux-saga/effects';
import {
    UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS, 
    GET_FILE_REQUEST, GET_FILE_SUCCESS,
    REMOVE_FILE_REQUEST, 
    REMOVE_FILE_SUCCESS,
    USER_FILE_CONNECT_REQUEST,
    USER_FILE_CONNECT_SUCCESS,
    REMOVE_FILE_CONNECT_SUCCESS,
    REMOVE_FILE_CONNECT_REQUEST,
    GET_FILE_CONNECT_REQUEST,
    GET_FILE_CONNECT_SUCCESS,
    INSERT_FILE_CONNECT_REQUEST,
    INSERT_FILE_CONNECT_SUCCESS
} from '../../actionTypes/file';

import { insertFileConnect, 
    uploadFile, 
    getFile, 
    getFileConnectById,
    removeFile, 
    removeFileConnect,
    userFileConnect
} from '../../../com/file';

function* fetchUploadFile(params) {
    const json = yield call(uploadFile, params.payload);
    yield put({ type: UPLOAD_FILE_SUCCESS, payload: json.data});
}

export function* uploadFileSaga() {
    yield takeLatest(UPLOAD_FILE_REQUEST, fetchUploadFile)
}

function* fetchGetFile(params) {
    const json = yield call(getFile, params.payload);
    yield put({ type: GET_FILE_SUCCESS, payload: json.data});
}

export function* getFileSaga() {
    yield takeLatest(GET_FILE_REQUEST, fetchGetFile)
}

function* fetchRemoveFile(params) {
    const json = yield call(removeFile, params.payload);
    yield put({ type: REMOVE_FILE_SUCCESS, payload: json.data});
}

export function* removeFileSaga() {
    yield takeLatest(REMOVE_FILE_REQUEST, fetchRemoveFile)
}

function* fetchInsertFileConnect(params) {
    const json = yield call(insertFileConnect, params.payload);
    yield put({ type: INSERT_FILE_CONNECT_SUCCESS, payload: json.data});
}

export function* insertFileConnectSaga() {
    yield takeLatest(INSERT_FILE_CONNECT_REQUEST, fetchInsertFileConnect)
}

function* fetchGetFileConnect(params) {
    const json = yield call(getFileConnectById, params.payload);
    yield put({ type: GET_FILE_CONNECT_SUCCESS, payload: json.data});
}

export function* getFileConnectSaga() {
    yield takeLatest(GET_FILE_CONNECT_REQUEST, fetchGetFileConnect)
}

function* fetchUserFileConnect(params) {
    const json = yield call(userFileConnect, params.payload);
    yield put({ type: USER_FILE_CONNECT_SUCCESS, payload: json.data});
}

export function* userFileConnectSaga() {
    yield takeLatest(USER_FILE_CONNECT_REQUEST, fetchUserFileConnect)
}

function* fetchRemoveFileConnect(params) {
    const json = yield call(removeFileConnect, params.payload);
    yield put({ type: REMOVE_FILE_CONNECT_SUCCESS, payload: json.data});
}

export function* removeFileConnectSaga() {
    yield takeLatest(REMOVE_FILE_CONNECT_REQUEST, fetchRemoveFileConnect)
}