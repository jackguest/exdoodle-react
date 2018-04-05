import { createSelector } from 'reselect'

const stockMetaData = state => state.stockData.stockMetaData;

const getStockMetaData = createSelector(
  [stockMetaData],
  (stockMetaData) => stockMetaData
)

export default getStockMetaData;
