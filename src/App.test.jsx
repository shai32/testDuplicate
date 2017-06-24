import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('test element', async () => {
  const wrapper = mount(<App />);
  expect(wrapper).toIncludeText('Grommet Sample');
});
