import React from 'react';
import ReactDOM from 'react-dom';
import createProject from './createProject';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<createProject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
