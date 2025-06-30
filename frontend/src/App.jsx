import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ApodPage from "./pages/ApodPage"; // Your APOD page/component
import MarsRover from "./pages/MarsRover"; // Your Mars Rover page/
import NasaIV from "./pages/NasaIV";
import NeoWs from "./pages/NeoWs";
import Epic from "./pages/Epic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<ApodPage />} />
        <Route path="/mars-rover" element={<MarsRover />} />
        <Route path="/nasa-iv" element={<NasaIV/>}/>
        <Route path="/neows" element={<NeoWs/>}/>
        <Route path="/epic" element={<Epic/>}/>

      </Routes>
    </Router>
  );
}

export default App;