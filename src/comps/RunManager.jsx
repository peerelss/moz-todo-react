import React, { useState, useEffect, useCallback } from "react";
import { Button, Input, InputNumber, Switch } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import "./run_manager.css";
const RunManager = () => {
  const [isZeroRunning, setisZeroRunning] = useState(false);
  const [isBotRunning, setIsBotRunning] = useState(false);
  const [isMonitorRunning, setIsMonitor] = useState(false);
  const [zeroGab, setZeroGab] = useState(360);
  const isZeroAlive = async () => {
    const result = await axios("http://127.0.0.1:5050/is_alive_zero");
    setisZeroRunning(result.data.running);
    console.log(result.data);
  };
  const switchZero = async (checked) => {
    let url = "http://127.0.0.1:5050/set_test_running?bool=";
    if (checked) {
      url = url + "1";
    }
    const result = await axios(url);
    console.log(result);
  };
  const changeHandler = (value) => {
    setZeroGab(value);
    console.log(value);
    debouncedChangeHandler(value);
  };
  const setRequest = (value) => {
    console.log("send ", value);
  };
  const debouncedChangeHandler = useCallback(debounce(setRequest, 1000), []);
  const isBotAlive = () => ({});
  const isMonitorAlive = () => ({});
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setisZeroRunning(checked);
    switchZero(checked);
    if (checked) {
      console.log("开启");
    } else {
      console.log("关闭");
    }
  };
  useEffect(() => {
    isZeroAlive();
  }, []);
  const onBotChange = (checked) => {};
  const onMonitorChange = (checked) => {};
  return (
    <div className="container_div">
      <div className="run_man">
        <h3>零算力矿机定时重启任务</h3>
        <Switch
          size="default"
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={isZeroRunning}
          onChange={onChange}
        />{" "}
        <div className="notice_txt">
          重启运行时长大于
          <InputNumber
            value={zeroGab}
            className={"notice_txt"}
            onChange={changeHandler}
          ></InputNumber>
          分钟
        </div>
        <br></br>
      </div>
      <div className="run_man">
        <h3>运维BOT任务</h3>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={isBotRunning}
          onChange={onBotChange}
        />
      </div>
      <div className="run_man">
        <h3>算力离线监控BOT任务</h3>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={isMonitorRunning}
          onChange={onMonitorChange}
        />
      </div>
    </div>
  );
};

export default RunManager;
