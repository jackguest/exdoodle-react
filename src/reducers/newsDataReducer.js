import * as types from '../constants/actionTypes';
import initialState from './stockConfigInitialState'

export default function newsDataReducer(state = initialState.newsData, action) {

  switch (action.type) {
    case types.NEWS_HEADLINE_FROM_KW_LOAD:
      return {
        ...state,
        newsHeadlinesFromKW: { ...action.val }
      };

    case types.SET_HEADLINE_FROM_KW:
      return {
        ...state,
        newsHeadlinesFromKW: { ...action.data }
      };

    default:
      return state;
  }
}
