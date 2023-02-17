import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const line_list = [
  "line_j",
  "line_e1",
  "line_e2",
  "line_i_k",
  "line_e_i_m",
  "line_e",
  "line_i",
  "line_k_1",
  "line_k_2",
  "line_k_3",
  "line_k_4",
  "line_o_1",
  "line_o_2",
  "line_o_3",
  "line_o_4",
];
const data = [
  { name: "1月", uv: 4000, pv: 2400, amt: 2400 },
  { name: "2月", uv: 3000, pv: 1398, amt: 2210 },
  { name: "3月", uv: 2000, pv: 9800, amt: 2290 },
  { name: "4月", uv: 2780, pv: 3908, amt: 2000 },
  { name: "5月", uv: 1890, pv: 4800, amt: 2181 },
  { name: "6月", uv: 2390, pv: 3800, amt: 2500 },
  { name: "7月", uv: 3490, pv: 4300, amt: 2100 },
  { name: "8月", uv: 3490, pv: 4300, amt: 2100 },
  { name: "9月", uv: 3490, pv: 4300, amt: 2100 },
  { name: "10月", uv: 3490, pv: 4300, amt: 2100 },
  { name: "11月", uv: 3490, pv: 4300, amt: 2100 },
  { name: "12月", uv: 3490, pv: 4300, amt: 2100 },
];
export default function MonitorHashRate() {
  const [lineData, setLineData] = useState();
  const updateLineData = async () => {
    const result = await axios(
      "http://127.0.0.1:5050/get_all_line_hash_rate_monitor"
    );
    console.log(result.data);

    setLineData(result.data.result);
  };
  useEffect(() => {
    updateLineData();
  }, []);
  return (
    <div>
      <LineChart
        width={1200}
        height={700}
        data={lineData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="line_j"
          stroke="#f7150e"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="line_e1" stroke="#fca709" />
        <Line type="monotone" dataKey="line_e2" stroke="#28ec0e" />
        <Line type="monotone" dataKey="line_i_k" stroke="#82ca9d" />
        <Line type="monotone" dataKey="line_e_i_m" stroke="#13d0e9" />
        <Line type="monotone" dataKey="line_e" stroke="#086ee2" />
        <Line type="monotone" dataKey="line_i" stroke="#cc1686" />
        <Line type="monotone" dataKey="line_k_1" stroke="#caa882" />
        <Line type="monotone" dataKey="line_k_2" stroke="#3e16cc" />
        <Line type="monotone" dataKey="line_k_3" stroke="#042538" />
        <Line type="monotone" dataKey="line_k_4" stroke="#3e16cc" />
        <Line type="monotone" dataKey="line_o_1" stroke="#82ca9d" />
        <Line type="monotone" dataKey="line_o_2" stroke="#3e16cc" />
        <Line type="monotone" dataKey="line_o_3" stroke="#82ca9d" />
        <Line type="monotone" dataKey="line_o_4" stroke="#3e16cc" />
      </LineChart>
    </div>
  );
}
