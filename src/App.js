// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SavedSongs from "./pages/SavedSongs";
import { FaHome, FaHeart } from "react-icons/fa";
import "../src/style.css"
const App = () => (
  <Router>
    <nav className="nav-bar" style={{ padding: "2rem", backgroundColor: "#000" }}>
      <Link to="/" className="icon-link" title="Home">
        <FaHome size={20} />
      </Link>
      <Link to="/saved" className="icon-link" title="Saved Songs">
        <FaHeart size={20} />
      </Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/saved" element={<SavedSongs />} />
    </Routes>
  </Router>
);

export default App;
