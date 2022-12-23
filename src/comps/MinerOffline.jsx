import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import JTest from "./JTest";
export default function MinerOffline() {
  const [data, setData] = useState([
    ["10.5.32.82", "Full Recovery"],
    ["10.5.32.64", "Full Recovery"],
  ]);
  const getData = () => {};
  const saveData = (d) => {
    const jsond = JSON.stringify(d);
    console.log(jsond);
  };
  return <JTest data={data} saveData={saveData} />;
}
