import { createSelector } from 'reselect'

const stockData = state => state.stockData;

const getStockData = createSelector(
  [stockData],
  (stockData) => stockData
)

export default getStockData;
