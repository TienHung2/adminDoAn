import React from 'react';
import ReactDOM from 'react-dom';
import LeTienHung from './LeTienHung';

it('renders without crashing', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<LeTienHung />, div);
  ReactDOM.unmountComponentAtNode(div);
});
