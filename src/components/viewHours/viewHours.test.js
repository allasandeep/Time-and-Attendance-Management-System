import React from 'react';
import ReactDOM from 'react-dom';
import viewHours from './viewHours';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<viewHours />, div);
  ReactDOM.unmountComponentAtNode(div);
});
