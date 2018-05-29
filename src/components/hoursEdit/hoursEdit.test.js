import React from 'react';
import ReactDOM from 'react-dom';
import hoursEdit from './hoursEdit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<hoursEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});
