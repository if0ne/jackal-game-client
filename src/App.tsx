import React from 'react';
import {Route, Routes} from "react-router";

import {AuthorizationPage} from "./page/AuthorizationPage";
import {TokenPage} from "./page/TokenPage";
import {WelcomePage} from "./page/WelcomePage";
import {GameListPage} from "./page/GameListPage";
import {ProfilePage} from "./page/ProfilePage";
import {RulePage} from "./page/RulePage";

function App() {
  return (
    <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/games" element={<GameListPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/rules" element={<RulePage/>}/>

        <Route path="/login" element={<AuthorizationPage/>}/>
        <Route path="/getToken" element={<TokenPage/>}/>
    </Routes>
  );
}

export default App;
