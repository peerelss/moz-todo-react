import React, { useState } from "react";
import MinerOffline from "./MinerOffline";
import MinerZero from "./MinerZero";
import MinerHashRate from "./MinerHashRate";
import CookiesManager from "./CookiesManager";
import { Button, Input } from "antd";
import { Outlet, NavLink, Link } from "react-router-dom";
import "./test_css.css";
export default function TestRouter() {
  const [displapValue, setDisplayValue] = useState([
    "none",
    "inline-block",
    "none",
    "none",
  ]);
  const showOffline = () => {
    setDisplayValue(["inline-block", "none", "none", "none"]);
  };
  const showZero = () => {
    setDisplayValue(["none", "inline-block", "none", "none"]);
  };
  const showHash = () => {
    setDisplayValue(["none", "none", "inline-block", "none"]);
  };
  const showCookies = () => {
    setDisplayValue(["none", "none", "none", "inline-block"]);
  };
  return (
    <div>
      <div className="box">
        <Button type="default" onClick={showZero} className="b-title">
          0算力矿机管理
        </Button>
        <Button type="default" onClick={showOffline} className="b-title">
          离线矿机
        </Button>
        <Button type="default" onClick={showHash} className="b-title">
          矿机运行监控
        </Button>
        <Button type="default" onClick={showCookies} className="b-title">
          Cookie管理
        </Button>
      </div>

      <div style={{ display: displapValue[1] }}>
        <MinerZero />
      </div>
      <div style={{ display: displapValue[0] }}>
        <MinerOffline />
      </div>
      <div style={{ display: displapValue[2] }}>
        <MinerHashRate />
      </div>
      <div style={{ display: displapValue[3] }}>
        <CookiesManager />
      </div>
    </div>
  );
}
