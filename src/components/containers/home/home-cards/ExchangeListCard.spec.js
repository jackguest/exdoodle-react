import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import ExchangeListCard from './ExchangeListCard'
import configureStore from '../../../../store/configureStore';

describe('<ExchangeListCard />', () => {

    const store = configureStore();
    const nasdaq = [], stockData = {}, classes = {};

    it('Should render ExchangeList Dialog Card', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ExchangeListCard nasdaq={nasdaq} stockData={stockData} classes={classes}/>
            </Provider>
        );
        expect(wrapper).toBeDefined();
    });

});
