import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from './App';
import {AxiosProvider} from "./hook/useAxios";
import {AuthProvider} from "./hook/useAuth";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <AxiosProvider>
          <BrowserRouter>
              <AuthProvider>
                  <App/>
              </AuthProvider>
          </BrowserRouter>
      </AxiosProvider>
  </React.StrictMode>
);
