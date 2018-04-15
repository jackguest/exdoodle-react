import getStockData from './getStockData';


describe('getStockData', () => {

    const input = {stockData: 1};

    it("Should return stockData directly from input", () => {
        expect(getStockData(input)).toEqual(1)
    });
});
