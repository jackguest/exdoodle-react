import React from 'react'
import App from './App'
import { createShallow } from 'material-ui/test-utils'

describe('<App />', () => {
    let shallow = createShallow();
    it('should render with styles HOC', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toBeDefined()
    })
});
