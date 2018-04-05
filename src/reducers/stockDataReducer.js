import * as types from '../constants/actionTypes';
import initialState from './stockConfigInitialState'

export default function stockDataReducer(state = initialState.stockData, action) {

  let tStock1, tStock2 = {};
  let val = {}
  switch (action.type) {
    case types.GET_SINGLE_STOCK_DAY:
      return {
        ...state,
       action
      }

    case types.SET_SELECTED_STOCKS:
      return {
        ...state,
        selectedStocks: action.val
      }

    case types.STOCK_META_DATA_LOAD:
      return {
        ...state,
        stockMetaData: { ...state.stockMetaData, ...action.val },
        stocks: { ...state.stocks, ...action.val}
      };

    case types.SET_STOCK_META_DATA:
      return {
        ...state,
        stockMetaData: { ...state.stockMetaData, ...action.meta },
        stocks: { ...state.stocks, ...action.data }
      };

    case types.STOCK_DAILY_LOAD:
      tStock1 = { ...state.stocks }
      val = { daily: { loading:true } }
      tStock2[action.symbol] = { ...state.stocks[action.symbol], ...val}
      return {
        ...state,
        stocks: { ...tStock1, ...tStock2 }
      };

    case types.SET_DAILY_DATA:
      tStock1 = { ...state.stocks }
      tStock2[action.symbol] = { ...state.stocks[action.symbol], ...action.data}
      return {
        ...state,
        stocks: { ...tStock1, ...tStock2 }
      };

    default:
      return state;
  }
}
