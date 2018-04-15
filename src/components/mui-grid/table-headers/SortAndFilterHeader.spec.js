import React from 'react'
import SortAndFilterHeader from './SortAndFilterHeader'
import { createShallow } from 'material-ui/test-utils'

describe('<SortAndFilterHeader />', () => {
    let shallow = createShallow();

    const classes = {}, numSelected = 0,
          onRequestSort = () => {}, onRequestFilter = () => {},
          order = '', orderBy = '', rowCount = 0,
          columnData = [];

    it('should render mui grid header', () => {
        const wrapper = shallow(<SortAndFilterHeader
            classes={classes}
            numSelected={numSelected}
            onRequestSort={onRequestSort}
            onRequestFilter={onRequestFilter}
            order={order}
            orderBy={orderBy}
            columnData={columnData}
            rowCount={rowCount}
        />);
        expect(wrapper).toBeDefined()
    })
});
