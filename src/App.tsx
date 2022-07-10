import React from 'react';
import {Route, Routes} from "react-router";

import AuthorizationPage from "./page/AuthorizationPage";
import TokenPage from "./page/TokenPage";
import {WelcomePage} from "./page/WelcomePage";
import {GameListPage} from "./page/GameListPage";

function App() {
  return (
    <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/games" element={<GameListPage/>}/>

        <Route path="/login" element={<AuthorizationPage/>}/>
        <Route path="/getToken" element={<TokenPage/>}/>
    </Routes>
  );
}

export default App;
