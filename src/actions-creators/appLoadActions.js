import * as types from '../constants/actionTypes';
import fetch from 'cross-fetch'

// example of a thunk using the redux-thunk middleware
export function getNasdaqExchangeList() {
  return function (dispatch) {

    dispatch({
      type: types.EXCHANGE_LIST_LOAD,
      val: true
    });

    //return fetch('http://192.168.1.94/gncl')
    //return fetch('./test-data/gncl.json')
    return fetch('http://192.168.1.94/gncl')
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: types.GET_NASDAQ_EXCHANGE_LIST,
          json
        });
      })
  }
}

export function addNasdaqExchangeList(exchangeLists, val) {
  return function (dispatch) {

    return dispatch({
      type: types.ADD_NASDAQ_EXCHANGE_LIST,
      val
    });
  };
}
