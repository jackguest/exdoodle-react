import { createSelector } from 'reselect'

const stocksBySymbol = (state, props) => {
    if(state.stockData.stocks.hasOwnProperty(props.symbol)) {
        return state.stockData.stocks[props.symbol][props.func];
    }
}

const getStocksBySymbolAndFunction = createSelector(
  [stocksBySymbol],
  (stocksBySymbol) => stocksBySymbol
);

export default getStocksBySymbolAndFunction;
