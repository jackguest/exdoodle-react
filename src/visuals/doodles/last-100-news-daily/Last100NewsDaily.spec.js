import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import Last100NewsDaily from './Last100NewsDaily'
import configureStore from '../../../store/configureStore';

describe('<Last100NewsDaily />', () => {

    const store = configureStore();
    const func = 'test', doodleStockAttrs = {}, headlines = {};

    it('Should render a Last 100 Days News Doodle', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Last100NewsDaily  func={func} doodleStockAttrs={doodleStockAttrs} headlines={headlines}/>
            </Provider>
        );
        expect(wrapper).toBeDefined();
    });

});
