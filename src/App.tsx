import './App.css';

import React from 'react';
import {Route, Routes} from "react-router";

import LoginPage from "./LoginPage";
import TokenPage from "./TokenPage";

function App() {
  return (
    <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/getToken" element={<TokenPage win={window}/>}/>
    </Routes>
  );
}

export default App;
