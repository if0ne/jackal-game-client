import React from 'react';
import {Route, Routes} from "react-router";

import LoginPage from "./page/LoginPage";
import TokenPage from "./page/TokenPage";
import {WelcomePage} from "./page/WelcomePage";
import {GameListPage} from "./page/GameListPage";

function App() {
  return (
    <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/games" element={<GameListPage/>}/>

        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/getToken" element={<TokenPage/>}/>
    </Routes>
  );
}

export default App;
