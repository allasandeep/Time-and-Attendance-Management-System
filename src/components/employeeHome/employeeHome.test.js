import React from 'react';
import ReactDOM from 'react-dom';
import Home from './employeeHome';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<employeeHome />, div);
  ReactDOM.unmountComponentAtNode(div);
});
