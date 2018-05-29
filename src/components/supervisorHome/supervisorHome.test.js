import React from 'react';
import ReactDOM from 'react-dom';
import Home from './supervisorHome';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<supervisorHome />, div);
  ReactDOM.unmountComponentAtNode(div);
});
