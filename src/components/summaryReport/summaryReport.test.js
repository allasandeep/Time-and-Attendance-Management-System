import React from 'react';
import ReactDOM from 'react-dom';
import summaryReport from './summaryReport';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<summaryReport />,div);
  ReactDOM.unmountComponentAtNode(div);
});
