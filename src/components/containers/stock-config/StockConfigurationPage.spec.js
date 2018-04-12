import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import StockConfigurationPage from './StockConfigurationPage'
import configureStore from '../../../store/configureStore';

describe('<StockPanelLast100Daily />', () => {

    const store = configureStore();
    const func = 'test';

    it('Should render a Stock Panel', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StockConfigurationPage func={func}/>
            </Provider>
        );
        expect(wrapper).toBeDefined();
    });

});
