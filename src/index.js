import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MinerOfflineDetail from "./comps/MinerOfflineDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoPlayMx from "./comps/VideoPlayMx";
import HotApp from "./comps/HotApp";
import LineConfig from "./comps/LineConfig";
import MinerOffline from "./comps/MinerOffline";
import MinerZero from "./comps/MinerZero";
import MinerZeroDetail from "./comps/MinerZeroDetail";
import HashAbnormal from "./comps/HashAbnormal";
import RunManager from "./comps/RunManager";
import CookieManager from "./comps/CookieManager";
import HashAbnormalDetail from "./comps/HashAbnormalDetail";
import MonitorHashRate from "./comps/MonitorHashRate";
import MonitorHashRateDetail from "./comps/MonitorHashRateDetail";
import TestComp from "./comps/TestComp";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {" "}
        <Route path="/offline" element={<MinerOffline />}>
          <Route path=":line" element={<MinerOfflineDetail />}></Route>
        </Route>
        <Route path="/zero" element={<MinerZero />}>
          <Route path=":line" element={<MinerZeroDetail />}></Route>
        </Route>
        <Route path="/line" element={<LineConfig />}></Route>
        <Route path="/abnormal" element={<HashAbnormal />}>
          <Route path=":line" element={<HashAbnormalDetail />}></Route>
        </Route>
        <Route path="/run" element={<RunManager />}></Route>
        <Route path="/cook" element={<CookieManager />}></Route>
        <Route path="/test" element={<TestComp />}></Route>
        <Route path="/monitor" element={<MonitorHashRate />}>
          <Route path=":line" element={<MonitorHashRateDetail />}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
