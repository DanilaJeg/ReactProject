import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the University Portal</h1>
      <Link to="/degree">View Degrees</Link>
    </div>
  );
}

export default Home;