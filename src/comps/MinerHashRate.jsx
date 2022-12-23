import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import JTest from "./JTest";
export default function MinerHashRate() {
  const [data, setData] = useState([
    ["10.5.32.82", "Full Recovery"],
    ["10.5.32.64", "Full Recovery"],
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:5050/getAllHashRate");
      setData(result.data);
      console.log(result.data);
    };

    fetchData();
  }, []);
  const saveData = () => {};
  return <JTest data={data} saveData={saveData} />;
}
