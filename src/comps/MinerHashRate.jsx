import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import JTest from "./JTest";
export default function MinerHashRate() {
  const [data, setData] = useState([
    ["10.5.32.82", "Full MinerHashRate"],
    ["10.5.32.64", "Full MinerHashRate"],
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:5050/getAllHashRate");
      setData(result.data);
      console.log(result.data);
      console.log("again ???");
    };

    fetchData();
  }, []);
  const saveData = () => {};
  return (
    <div>
      <h2>实时算力监控</h2>
      <JTest data={data} saveData={saveData} />
    </div>
  );
}
