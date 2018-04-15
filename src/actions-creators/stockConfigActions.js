import * as types from '../constants/actionTypes';
import fdMaps from '../constants/functionDataMaps'
import fetch from "cross-fetch";
//import * as dataParsers from "../utils/dataParsers";

// example of a thunk using the redux-thunk middleware
export function getSingleStockDay(setting, val) {
  return function (dispatch) {

    return dispatch({
      type: types.GET_SINGLE_STOCK_DAY,
      val
    });
  };
}

export function setSelectedStocksList(list, val) {
  return function (dispatch) {

    return dispatch({
      type: types.SET_SELECTED_STOCKS,
      val
    });
  };
}

export function setStockMetaData(stockMetaData, symbol) {
  return function (dispatch) {

    let symbolLoad = {};
    symbolLoad[symbol] = {
      loading: true
    };

    dispatch({
      type: types.STOCK_META_DATA_LOAD,
      val: symbolLoad
    });

    //eturn fetch('./test-data/' + symbol + '_ma.json')
    //return fetch('http://192.168.1.76:5000/tss/' + symbol + '/get_monthly_adjusted')
    return fetch('http://192.168.1.94/tss/' + symbol + '/get_monthly_adjusted')
      .then(response => response.json())
      .then(json => {
        let meta = {}, data = {}, dSet = {}, func = fdMaps[json['meta']['function']];
        json['meta']['loading'] = false;
        let dataPointCount = json['data'].length;
        meta[json['meta']['symbol']] = { ...json['meta'], dataPointCount: dataPointCount };
        data[json['meta']['symbol']] = {};
        dSet[func] = {};
        dSet[func] = json['data'];
        json['data'] = json['data'].sort((a, b) => (a['date'] < b['date'] ? -1 : 1));
        data[json['meta']['symbol']] = dSet;

        dispatch({
          type: types.SET_STOCK_META_DATA,
          meta,
          data
        });
      })
  };
}

export function setStockDaily(symbol) {
  return function (dispatch) {

    if(!symbol) return;

    dispatch({
      type: types.STOCK_DAILY_LOAD,
      symbol
    });

    //eturn fetch('./test-data/' + symbol + '_ma.json')
    //return fetch('http://192.168.1.76:5000/tss/' + symbol + '/get_monthly_adjusted')
    return fetch('http://192.168.1.94/tss/' + symbol + '/get_daily')
      .then(response => response.json())
      .then(json => {
        let data = {}, func = fdMaps[json['meta']['function']];
        data[func] = json['data'].sort((a, b) => (a['date'] < b['date'] ? -1 : 1));

        dispatch({
          type: types.SET_DAILY_DATA,
          data,
          symbol
        });
      })
  };
}

export function setNewsHeadlinesFromKW() {
  return function (dispatch) {

    let newsLoad = {};
    newsLoad = {
      loading: true
    };

    dispatch({
      type: types.NEWS_HEADLINE_FROM_KW_LOAD,
      val: newsLoad
    });


    //return fetch('http://192.168.1.76:5000/nrakw')
    return fetch('http://192.168.1.94/nrakw')
      .then(response => response.json())
      .then(json => {
        const data = json['data'].sort((a, b) => (a['date'] < b['date'] ? -1 : 1));

        dispatch({
          type: types.SET_HEADLINE_FROM_KW,
          data
        });
      })
  };
}

