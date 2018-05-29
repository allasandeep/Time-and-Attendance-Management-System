import React from 'react';
import ReactDOM from 'react-dom';
import superAddEmployees from './superAddEmployees';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<superAddEmployees />, div);
  ReactDOM.unmountComponentAtNode(div);
});
