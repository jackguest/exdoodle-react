import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import HomePage from './HomePage'
import configureStore from '../../../store/configureStore';

describe('<HomePage />', () => {

    const store = configureStore();


    it('Should render homepage', () => {
        const wrapper = mount(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );
        expect(wrapper).toBeDefined();
    });

});
