import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import StockPanel from './StockPanel'
import configureStore from '../../../../store/configureStore';

describe('<StockPanel />', () => {

    const store = configureStore();
    const deleteMe = () => {}, symbols = [], symbol = 'test';

    it('Should render a Stock Panel', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StockPanel deleteMe={deleteMe} symbol={symbol} symbols={symbols} />
            </Provider>
        );
        expect(wrapper).toBeDefined();
    });

});
