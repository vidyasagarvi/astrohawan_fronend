import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import reportWebVitals from './reportWebVitals';
import i18n from './i18n';

import '../src/css/bootstrap.min.css'
import '../src/css/style.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../src/lib/easing/easing.min.js';
import '../src/lib/waypoints/waypoints.min.js';
import '../src/lib/lightbox/js/lightbox.min.js';
import '../src/lib/owlcarousel/owl.carousel.min.js';
import '../src/js/main.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <I18nextProvider i18n={i18n}>
    <App />
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


reportWebVitals();
