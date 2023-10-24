import {call, put, takeLatest} from 'redux-saga/effects';
import {
    INSERT_PROPOSAL_REQUEST,
    INSERT_PROPOSAL_SUCCESS,
    UPDATE_PROPOSAL_REQUEST,
    UPDATE_PROPOSAL_SUCCESS,
    GET_PROPOSAL_REQUEST,
    GET_PROPOSAL_SUCCESS,
    LIST_PROPOSAL_REQUEST,
    LIST_PROPOSAL_SUCCESS,
    USER_PROPOSAL_REQUEST,
    USER_PROPOSAL_SUCCESS,
    REMOVE_PROPOSAL_REQUEST,
    REMOVE_PROPOSAL_SUCCESS
} from '../../actionTypes/proposal';

import { doInsertProposal, doGetProposal,
    doListProposal, doRemoveProposal, doUpdateProposal,
    doUserProposal } from '../../../com/proposal';

import { doGetCompanies } from '../../../com/companies';
import { doGetShares } from '../../../com/shares';
     
function* insertProposalFetch(params) {
    const json = yield call(doInsertProposal, params.payload);   
    yield put({ type: INSERT_PROPOSAL_SUCCESS, payload: json.data});
}

function* updateProposalFetch(params) {
    const json = yield call(doUpdateProposal, params.payload);   
    yield put({ type: UPDATE_PROPOSAL_SUCCESS, payload: json.data});
}

function* getProposalFetch(params) {
    const json = yield call(doGetProposal, params.payload);   
    const {proposal} = json.data;
    const compaiesResponse =  yield call(doGetCompanies, {companies_id: proposal.companies_id});
    const sharesResponse =  yield call(doGetShares, {shares_id: proposal.shares_id});
    proposal.companies = compaiesResponse.data.company ? compaiesResponse.data.company : {};
    proposal.shares = sharesResponse.data.shares ? sharesResponse.data.shares : {};
    yield put({ type: GET_PROPOSAL_SUCCESS, payload: json.data});
}

function* listProposalFetch(params) {
    const json = yield call(doListProposal, params.payload);   
    const {proposals} = json.data;
    for (let index = 0; index < proposals.length; index++) {
        const compaiesResponse =  yield call(doGetCompanies, {companies_id: proposals[index].companies_id});
        proposals[index].companies = compaiesResponse.data.company ? compaiesResponse.data.company : {};
    }
    yield put({ type: LIST_PROPOSAL_SUCCESS, payload: json.data});
}

function*  userProposalFetch(params) {
    const json = yield call(doUserProposal, params.payload);   
    const {proposals} = json.data;
    for (let index = 0; index < proposals.length; index++) {
        const compaiesResponse =  yield call(doGetCompanies, {companies_id: proposals[index].companies_id});
        proposals[index].companies = compaiesResponse.data.company ? compaiesResponse.data.company : {};
    }
    yield put({ type: USER_PROPOSAL_SUCCESS, payload: json.data});
}

function* removeProposalFetch(params) {
    const json = yield call(doRemoveProposal, params.payload);   
    yield put({ type: REMOVE_PROPOSAL_SUCCESS, payload: json.data});
}

export function* removeProposalSaga() {
    yield takeLatest(REMOVE_PROPOSAL_REQUEST, removeProposalFetch)
}

export function* getProposalSaga() {
    yield takeLatest(GET_PROPOSAL_REQUEST, getProposalFetch)
}

export function* userProposalSaga() {
    yield takeLatest(USER_PROPOSAL_REQUEST, userProposalFetch)
}

export function* listProposalSaga() {
    yield takeLatest(LIST_PROPOSAL_REQUEST, listProposalFetch)
}

export function* insertProposalSaga() {
    yield takeLatest(INSERT_PROPOSAL_REQUEST, insertProposalFetch)
}

export function* updateProposalSaga() {
    yield takeLatest(UPDATE_PROPOSAL_REQUEST, updateProposalFetch)
}
