import React, { useState, useRef, useEffect } from "react";
import { useParams, userParams } from "react-router-dom";
import axios from "axios";
import JTest from "./JTest";
import "./test_css.css";
import { Button, Input } from "antd";
const MinerOfflineDetail = () => {
  let params = useParams();
  let line = params.line;
  const [data, setData] = useState([["10.7.10.10", "s19j pro", "Empty Miner"]]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://127.0.0.1:5050/get_offline_lines/" + line
      );
      console.log(result.data);
      setData(result.data);
    };
    fetchData();
  }, [line]);
  const getData = () => {};
  const saveData = async (d) => {
    params = { line: line, ips: d };
    console.log(params);
    const result = await axios.post(
      "http://127.0.0.1:5050/save_offline_lines",
      params
    );
    console.log(result.data);
  };
  return (
    <div>
      <JTest data={data} saveData={saveData} />
    </div>
  );
};

export default MinerOfflineDetail;
