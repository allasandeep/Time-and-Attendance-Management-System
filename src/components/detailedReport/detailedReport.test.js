import React from 'react';
import ReactDOM from 'react-dom';
import detailedReport from './detailedReport';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<detailedReport />, div);
  ReactDOM.unmountComponentAtNode(div);
});
