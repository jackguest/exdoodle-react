import { createSelector } from 'reselect'

const newsHeadlinesFromKW = state => state.newsData.newsHeadlinesFromKW;

const getNewsHeadlinesFromKW = createSelector(
  [newsHeadlinesFromKW],
  (newsHeadlinesFromKW) => newsHeadlinesFromKW
)

export default getNewsHeadlinesFromKW
