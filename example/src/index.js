import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './components/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import 'animate.css';
import './test.css';

// http://localhost:3000/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
