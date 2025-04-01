import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Degrees from "./pages/Degrees.jsx";
import SingleDegree from "./pages/SingleDegree.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/degree" element={<Degrees />} />
        <Route path="/degree/:shortcode" element={<SingleDegree />} />
      </Routes>
    </Router>
  );
}

export default App;
