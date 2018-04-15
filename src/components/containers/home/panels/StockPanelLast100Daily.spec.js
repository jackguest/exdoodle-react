import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import StockPanelLast100Daily from './StockPanelLast100Daily'
import configureStore from '../../../../store/configureStore';

describe('<StockPanelLast100Daily />', () => {

    const store = configureStore();
    const func = 'test';

    it('Should render a Stock Panel Last 100 Days', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StockPanelLast100Daily func={func}/>
            </Provider>
        );
        expect(wrapper).toBeDefined();
    });

});
