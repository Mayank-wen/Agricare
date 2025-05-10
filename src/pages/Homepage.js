import React from "react";
import Home from "./Home";
import About from "./About";
import PlatformSolutions from "./platformsolution";
import ResourcesPage from "./Resources";
import Es from "./Es";

function Homepage() {
  return (
    <div className="App">
      <Home />
      <About />
      <PlatformSolutions />
      <ResourcesPage />
      <Es />
    </div>
  );
}

export default Homepage;
