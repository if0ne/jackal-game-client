import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from './App';
import {AxiosProvider} from "./hook/useAxios";
import {AuthProvider} from "./hook/useAuth";
import {LobbyProvider} from "./hook/useLobby";
import {GameProvider} from "./hook/useGameService";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
      <AxiosProvider>
          <BrowserRouter>
              <AuthProvider>
                  <LobbyProvider>
                      <GameProvider>
                          <App/>
                      </GameProvider>
                  </LobbyProvider>
              </AuthProvider>
          </BrowserRouter>
      </AxiosProvider>
);
