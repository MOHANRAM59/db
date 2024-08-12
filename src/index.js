import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './UserContext';
import './index.css'; // Import Tailwind CSS

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
