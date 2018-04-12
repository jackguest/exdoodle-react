import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import StockPanelDetails from './StockPanelDetails'
import configureStore from '../../../../store/configureStore';

describe('<StockPanelDetails />', () => {

    const store = configureStore();
    const stock = [], symbol = 'test';

    it('Should render a Stock Panel', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StockPanelDetails stock={stock} symbol={symbol} func='monthlyAdjusted'/>
            </Provider>
        );
        expect(wrapper).toBeDefined();
    });

});
