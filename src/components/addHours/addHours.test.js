import React from 'react';
import ReactDOM from 'react-dom';
import addHours from './addHours';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<addHours />, div);
  ReactDOM.unmountComponentAtNode(div);
});
