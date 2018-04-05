import {GET_NASDAQ_EXCHANGE_LIST, ADD_NASDAQ_EXCHANGE_LIST, EXCHANGE_LIST_LOAD} from '../constants/actionTypes';
import initialState from './stockConfigInitialState'

export default function exchangeListReducer(state = initialState.exchangeLists, action) {

  switch (action.type) {
    case GET_NASDAQ_EXCHANGE_LIST:
      return {
        ...state,
        nasdaq: action.json,
        loading: false
      };

    case EXCHANGE_LIST_LOAD:
      return {
        loading: true
      };

    case ADD_NASDAQ_EXCHANGE_LIST:
      return {
        ...state,
        nasdaq: state.nasdaq.concat(action.val)
      };

    default:
      return state;
  }
}
