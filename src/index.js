import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MinerOfflineDetail from "./comps/MinerOfflineDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoPlayMx from "./comps/VideoPlayMx";
import HotApp from "./comps/HotApp";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {" "}
        <Route path="/offline/:line" element={<MinerOfflineDetail />}></Route>
      </Route>
      <Route path="/play" element={<HotApp />}></Route>
    </Routes>
  </BrowserRouter>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
