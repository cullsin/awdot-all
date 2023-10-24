import { 
    CREATE_MESSAGE_REQUEST,
    GET_MESSAGE_REQUEST,
    DELETE_MESSAGE_REQUEST
} from '../../actionTypes/message';

export const createMessageRequest = (params) => {
return {
  type: CREATE_MESSAGE_REQUEST,
  payload:params
};
};

export const getMessageRequest = (params) => {
return {
  type: GET_MESSAGE_REQUEST,
  payload:params
};
};

export const deleteMessageRequest = (params) => {
    return {
      type: DELETE_MESSAGE_REQUEST,
      payload:params
    };
};
    