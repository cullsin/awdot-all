import { 
    INSERT_PROPOSAL_REQUEST,
    UPDATE_PROPOSAL_REQUEST,
    GET_PROPOSAL_REQUEST,
    LIST_PROPOSAL_REQUEST,
    USER_PROPOSAL_REQUEST,
    REMOVE_PROPOSAL_REQUEST
} from '../../actionTypes/proposal';

export const insertProposalRequest = (params) => {
  return {
    type: INSERT_PROPOSAL_REQUEST,
    payload:params
  };
};

export const updateProposalRequest = (params) => {
  return {
    type: UPDATE_PROPOSAL_REQUEST,
    payload:params
  };
};

export const getProposalRequest = (params) => {
  return {
    type: GET_PROPOSAL_REQUEST,
    payload:params
  };
};

export const listProposalRequest = (params) => {
  return {
    type: LIST_PROPOSAL_REQUEST,
    payload:params
  };
};

export const userProposalRequest = (params) => {
  return {
    type: USER_PROPOSAL_REQUEST,
    payload:params
  };
};

export const removeProposalRequest = (params) => {
  return {
    type: REMOVE_PROPOSAL_REQUEST,
    payload:params
  };
};