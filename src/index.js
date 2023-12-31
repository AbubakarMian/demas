import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-phone-number-input/style.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import swDev from './swDev' 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
swDev();

