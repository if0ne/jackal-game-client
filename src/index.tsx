import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {PhaserGameComponent} from "./components/PhaserGameComponent";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PhaserGameComponent />
  </React.StrictMode>
);
