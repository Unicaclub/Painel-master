import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkin from "./pages/Checkin";
import Relatorio from "./pages/Relatorio";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Checkin />} />
        <Route path="/relatorio" element={<Relatorio />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
