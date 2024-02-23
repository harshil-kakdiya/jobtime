import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./pages/Loading"
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Loading />} />
        <Route exact path="/home" element={ <Home />} />
        </Routes>
    </Router>
  );
};

export default App;