import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Items from "./Items";
import Login from "./Login";
import "@fontsource/roboto/400.css";

export default function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingTop: "100px",
        boxSizing: "border-box",
      }}
    >
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
