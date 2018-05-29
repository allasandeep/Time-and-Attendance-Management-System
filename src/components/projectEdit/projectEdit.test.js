import React from 'react';
import ReactDOM from 'react-dom';
import projectEdit from './projectEdit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<projectEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});
