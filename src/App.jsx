import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NoPage from "./pages/NoPage";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
