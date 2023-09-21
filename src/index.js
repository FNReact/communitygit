import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import { AddToHomeScreen } from "react-pwa-add-to-homescreen";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <App />
    <AddToHomeScreen />
    </>
    
);



serviceWorkerRegistration.register();
reportWebVitals();
