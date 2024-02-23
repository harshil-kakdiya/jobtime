import React from "react";
import {  HashRouter, Route, Routes } from "react-router-dom";
import Loading from "./pages/Loading"
import Home from "./pages/Home";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={ <Loading />} />
        <Route exact path="/home" element={ <Home />} />
        </Routes>
    </HashRouter>
  );
};

export default App;