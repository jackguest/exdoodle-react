import { combineReducers } from 'redux';
import stockData from './stockDataReducer';
import exchangeLists from './exchangeListReducer';
import newsData from './newsDataReducer'
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  exchangeLists,
  stockData,
  newsData,
  routing: routerReducer
});

export default rootReducer;
