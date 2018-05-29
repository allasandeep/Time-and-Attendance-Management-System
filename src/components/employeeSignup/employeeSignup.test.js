import React from 'react';
import ReactDOM from 'react-dom';
import employeeSignup from './employeeSignup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<employeeSignup />, div);
  ReactDOM.unmountComponentAtNode(div);
});
