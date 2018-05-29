import React from 'react';
import ReactDOM from 'react-dom';
import hoursReport from './hoursReport';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<hoursReport />,div);
  ReactDOM.unmountComponentAtNode(div);
});
