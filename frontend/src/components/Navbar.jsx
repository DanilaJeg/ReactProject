import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/degree">Degrees</Link> | <Link to="/cohort">Cohorts</Link> | <Link to="/module">Modules</Link>    
    </nav>
  );
}

export default Navbar;