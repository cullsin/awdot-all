import {  
    INSERT_PURCHASE_REQUEST,
    INSERT_PURCHASE_SUCCESS,
    UPDATE_PURCHASE_REQUEST,
    UPDATE_PURCHASE_SUCCESS,
    FEE_PURCHASE_REQUEST,
    FEE_PURCHASE_SUCCESS,
    GET_PURCHASE_REQUEST,
    GET_PURCHASE_SUCCESS,
    USER_PURCHASE_REQUEST,
    USER_PURCHASE_SUCCESS,
  } from '../../actionTypes/purchase';
  
  const purchaseReducer = (state = {}, action) => {
    switch (action.type) {  
      case INSERT_PURCHASE_REQUEST:
        state = { ...state, insert: {} };
        break;
        case UPDATE_PURCHASE_REQUEST:
          state = { ...state, update: {} };
          break;
  
        case GET_PURCHASE_REQUEST:
          state = { ...state, get: [] };
          break;
        case FEE_PURCHASE_REQUEST:
            state = { ...state, fee: {} };
            break;
      case USER_PURCHASE_REQUEST:
        state = { ...state, user: {} };
        break;
    case INSERT_PURCHASE_SUCCESS:
        state = { ...state,
                  insert:{
                      ...action.payload  
                  }
              };
        break;
        case UPDATE_PURCHASE_SUCCESS:
          state = { ...state,
                    update:{
                        ...action.payload  
                    }
                };
          break;
  
        case FEE_PURCHASE_SUCCESS:
          state = { ...state,
                    fee:{
                        ...action.payload  
                    }
                };
          break;  
      case GET_PURCHASE_SUCCESS:
        state = { ...state,
                  get:{
                      ...action.payload  
                  }
              };
        break;
      case USER_PURCHASE_SUCCESS:
        state = { ...state,
                  user:{
                      ...action.payload
                  }
                };        
        break;
      default:
        break;
    }
    return state;
  };
  export default purchaseReducer;