import React from 'react';
import { render } from '@testing-library/react';
import App from './Components/App/App';

test('renders learn react link', () => {
  const div=document.createElement('div');
  ReactDOM.render(<App/>,div);
});
