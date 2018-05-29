import React from 'react';
import ReactDOM from 'react-dom';
import viewHoursSuper from './viewHoursSuper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<viewHoursSuper />, div);
  ReactDOM.unmountComponentAtNode(div);
});
