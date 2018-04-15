import getStockMetaData from './getStockMetaData';


describe('getStockData', () => {

    const input = {stockData: { stockMetaData: 1 }};

    it("Should return stockMetaData from stockData", () => {
        expect(getStockMetaData(input)).toEqual(1)
    });
});
