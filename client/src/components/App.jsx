import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Items from "./Items"
export default function App() {
  return (
    <div style={{ width: "100%", height: "100%", paddingTop: "100px", boxSizing: 'border-box' }}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/items" element={<Items/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
