import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx";
import Degrees from "./pages/Degrees.jsx";
import SingleDegree from "./pages/SingleDegree.jsx";
import SingleDegreeCohort from "./pages/SingleDegreeCohort.jsx"
import CreateDegree from "./pages/CreateDegree.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/degree" element={<Degrees />} />
        <Route path="/degree/:shortcode" element={<SingleDegree />} />
        <Route path="/cohort/:cohortID" element={<SingleDegreeCohort />} />
        <Route path="/degree/create" element={<CreateDegree />} />
      </Routes>
    </Router>
  );
}

export default App;
