import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ApodPage from "./pages/ApodPage"; // Your APOD page/component
import MarsRover from "./pages/MarsRover"; // Your Mars Rover page/component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<ApodPage />} />
        <Route path="/mars-rover" element={<MarsRover />} />
      </Routes>
    </Router>
  );
}

export default App;