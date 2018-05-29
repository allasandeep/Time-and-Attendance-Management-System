import React from 'react';
import ReactDOM from 'react-dom';
import employeeEdit from './employeeEdit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<employeeEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});
