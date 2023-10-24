import {  
    INSERT_PROPOSAL_REQUEST,
    INSERT_PROPOSAL_SUCCESS,
    UPDATE_PROPOSAL_REQUEST,
    UPDATE_PROPOSAL_SUCCESS,
    GET_PROPOSAL_REQUEST,
    GET_PROPOSAL_SUCCESS,
    USER_PROPOSAL_REQUEST,
    USER_PROPOSAL_SUCCESS,
    LIST_PROPOSAL_REQUEST,
    LIST_PROPOSAL_SUCCESS,
    REMOVE_PROPOSAL_REQUEST,
    REMOVE_PROPOSAL_SUCCESS
  } from '../../actionTypes/proposal';
  
  const proposalReducer = (state = {}, action) => {
    switch (action.type) {  
      case INSERT_PROPOSAL_REQUEST:
        state = { ...state, insert: {} };
        break;
        case UPDATE_PROPOSAL_REQUEST:
          state = { ...state, update: {} };
          break;
      case GET_PROPOSAL_REQUEST:
          state = { ...state, get: [] };
          break;
      case USER_PROPOSAL_REQUEST:
        state = { ...state, user: {} };
        break;
      case LIST_PROPOSAL_REQUEST:
          state = { ...state, list: {} };
          break;
      case REMOVE_PROPOSAL_REQUEST:
        state = { ...state, remove: {} };
        break;
    case INSERT_PROPOSAL_SUCCESS:
        state = { ...state,
                  insert:{
                      ...action.payload  
                  }
              };
        break;
        case UPDATE_PROPOSAL_SUCCESS:
          state = { ...state,
                    update:{
                        ...action.payload  
                    }
                };
          break;  
      case GET_PROPOSAL_SUCCESS:
        state = { ...state,
                  get:{
                      ...action.payload  
                  }
              };
        break;
      case LIST_PROPOSAL_SUCCESS:
        state = { ...state,
                  list:{
                      ...action.payload
                  }
              };
      break;        
      case USER_PROPOSAL_SUCCESS:
        state = { ...state,
                  user:{
                      ...action.payload
                  }
                };        
        break;
      case REMOVE_PROPOSAL_SUCCESS:
        state = { ...state,
                  remove:{
                      ...action.payload
                  }
                };        
        break;
      default:
        break;
    }
    return state;
  };
  export default proposalReducer;