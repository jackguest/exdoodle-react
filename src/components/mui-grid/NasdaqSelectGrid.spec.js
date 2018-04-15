import React from 'react'
import NasdaqSelectGrid from './NasdaqSelectGrid'
import { createShallow } from 'material-ui/test-utils'

describe('<NasdaqSelectGrid />', () => {
    let shallow = createShallow();

    const classes = {}, columnData = [], selectedSymbols = [],
          nasdaq = [], stockSelector = () => {}, stockData = {};

    it('should render exchangelist Grid', () => {
        const wrapper = shallow(<NasdaqSelectGrid
            classes={classes}
            columnData={columnData}
            selectedSymbols={selectedSymbols}
            nasdaq={nasdaq}
            stockSelector={stockSelector}
            stockData={stockData}
        />);
        expect(wrapper).toBeDefined()
    })
});
