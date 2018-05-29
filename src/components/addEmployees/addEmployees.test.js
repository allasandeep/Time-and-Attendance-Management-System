import React from 'react';
import ReactDOM from 'react-dom';
import addEmployees from './addEmployees';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<addEmployees />, div);
  ReactDOM.unmountComponentAtNode(div);
});
