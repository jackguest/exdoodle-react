import getNewsHeadlinesFromKW from './getNewsHeadlinesFromKW';


describe('getNewsHeadlinesFromKW', () => {

    const input = {newsData: { newsHeadlinesFromKW: 1 }};

    it("Should return headlines from newsData", () => {
        expect(getNewsHeadlinesFromKW(input)).toEqual(1)
    });
});
