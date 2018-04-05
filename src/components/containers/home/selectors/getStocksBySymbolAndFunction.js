import { createSelector } from 'reselect'

const stocksBySymbol = (state, props) => state.stockData.stocks[props.symbol][props.func];

const getStocksBySymbolAndFunction = createSelector(
  [stocksBySymbol],
  (stocksBySymbol) => stocksBySymbol
);

export default getStocksBySymbolAndFunction;
