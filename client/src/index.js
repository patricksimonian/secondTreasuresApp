import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
const root = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
