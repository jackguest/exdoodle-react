import getExchangeLists from './getExchangeLists';


describe('getExchangeLists', () => {

    const input = { exchangeLists: 1 };

    it("Should return exchangeList from input", () => {
        expect(getExchangeLists(input)).toEqual(1)
    });
});
