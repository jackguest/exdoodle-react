import React from 'react';
import { shallow } from 'enzyme';
import DialogCard from './DialogCard'

describe('<DialogCard />', () => {

    const nasdaq = [], classes = {}, loadNasdaq = () => {}, loading = false

    it('Should render Homepage Dialog Card', () => {
        const wrapper = shallow(<DialogCard nasdaq={nasdaq} classes={classes} loadNasdaq={loadNasdaq} loading={loading}/>)

        expect(wrapper).toBeDefined();
    });

});
