import React from 'react';
import ReactDOM from 'react-dom';
import ReadEmployees from './ReadEmployees';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReadEmployees />, div);
  ReactDOM.unmountComponentAtNode(div);
});
