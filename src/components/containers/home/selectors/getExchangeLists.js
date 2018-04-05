import { createSelector } from 'reselect'

const exchangeLists = state => state.exchangeLists;

const getExchangeLists = createSelector(
  [exchangeLists],
  (exchangeLists) => exchangeLists
)

export default getExchangeLists
