

export const createNasdaqShortInfo = (data) => {
  let tData = [];
  for(let val in data){
    tData.push({
      id: data[val].Symbol,
      Symbol: data[val].Symbol,
      Name: data[val].Name,
      Sector: data[val].Sector,
      industry: data[val].industry
    })
  }
  return tData;
};

export const getNasdaqDetails = (byVal, vals, data) => {
  let res = [];
  if(byVal === "Symbol") {
    if(typeof vals === 'object'){
      res = data.filter((item) => {
        return vals.indexOf(item.Symbol) !== -1;
      })
    }
  }

  return res;
};

export const getSelectedStockSymbols = (selectedStocks) => {
  let res = [];
  res = selectedStocks.map((item) => {
    return item.Symbol
  });
  return res;
};

export const formatStockMetaData = (data) => {
  //get data point count
  const d1 = new Date(data['mBegin']);
  const d2 = new Date(data['mEnd']);
  let dataPointCount = 0;
  if(d1 === d2){
    dataPointCount = Math.abs(d2.getMonth() - d1.getMonth())
  } else {
    let yrs = d2.getFullYear() - d1.getFullYear();
    let m1 = d1.getMonth();
    let m2 = d2.getMonth();
    if(m1 > m2) yrs--;
    dataPointCount = yrs*12 + m2 + (12 - m1)
  }

  return {
    dataPointCount
  }
};

export const getHeadlineDayMap = (data) => {
  let ret = {};
  for(let i in data) {
    if(!ret.hasOwnProperty(data[i].date)) {
      ret[data[i].date] = [{
        head: data[i].head,
        main: data[i].main,
        snippet: data[i].snippet
      }]
    } else {
      ret[data[i].date].push({
        head: data[i].head,
        main: data[i].main,
        snippet: data[i].snippet
      })
    }
  }
  return ret;
};
