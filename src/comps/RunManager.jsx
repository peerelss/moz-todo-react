import React, { useState, useEffect } from "react";
import { Button, Switch } from "antd";
import axios from "axios";
import "./run_manager.css";
const RunManager = () => {
  const [isZeroRunning, setisZeroRunning] = useState(false);
  const isZeroAlive = async () => {
    const result = await axios("http://127.0.0.1:5050/is_alive_zero");
    setisZeroRunning(result.data.running);
    console.log(result.data);
  };
  const switchZero = async (checked) => {
    const result = await axios("");
    console.log(result);
  };
  const isBotAlive = () => ({});
  const isMonitorAlive = () => ({});
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    if (checked) {
      console.log("开启");
      setisZeroRunning(checked);
    } else {
      console.log("关闭");
      setisZeroRunning(checked);
    }
  };
  useEffect(() => {
    isZeroAlive();
  }, []);
  return (
    <div>
      <div className="run_man">
        <Button onClick={isZeroAlive}>0算力重启</Button>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={isZeroRunning}
          onChange={onChange}
        />{" "}
      </div>
      <div className="run_man">
        <Button onClick={isBotAlive}>TelBot运行</Button>
      </div>
      <div className="run_man">
        <Button onClick={isMonitorAlive}>算力监控运行</Button>
      </div>
    </div>
  );
};

export default RunManager;
