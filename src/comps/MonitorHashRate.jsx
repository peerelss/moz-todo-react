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

const data_2_monitor = (data) => {
  return {
    name: data.name,
    line_j: data.line_j,
    line_e1: data.line_e1,
    line_e2: data.line_e2,
    line_i_k: data.line_i_k,
    line_e_i_m: data.line_e_i_m,
    line_e: data.line_e,
    line_i: data.line_i,
    line_k_1: data.line_k_1,
    line_k_2: data.line_k_2,
    line_k_3: data.line_k_3,
    line_k_4: data.line_k_4,
    line_o_1: data.line_o_1,
    line_o_2: data.line_o_2,
    line_o_3: data.line_o_3,
    line_o_4: data.line_o_4,
    line_e_new_0307: data.line_e_new_0307,
  };
};
export default function MonitorHashRate() {
  const [lineData, setLineData] = useState();
  const [timeId, setTimeId] = useState(null);
  useEffect(() => {
    const id = setInterval(() => {
      updateLineData();
      console.log(id);
    }, 5 * 59 * 1000);
    setTimeId(id);
    return () => {
      clearInterval(timeId);
    };
  }, []);

  const updateLineData = async () => {
    const result = await axios(
      "http://127.0.0.1:5050/get_all_line_hash_rate_monitor"
    );
    const data_new = result.data.result.map(data_2_monitor);

    setLineData(data_new);
  };
  useEffect(() => {
    updateLineData();
  }, []);
  return (
    <div>
      <LineChart
        width={800}
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
          stroke="red"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="line_e1" stroke="red" />
        <Line type="monotone" dataKey="line_e2" stroke="red" />
        <Line type="monotone" dataKey="line_i_k" stroke="red" />
        <Line type="monotone" dataKey="line_e_new_0307" stroke="red" />
        <Line type="monotone" dataKey="line_e_i_m" stroke="black" />
        <Line type="monotone" dataKey="line_e" stroke="black" />
        <Line type="monotone" dataKey="line_i" stroke="black" />
        <Line type="monotone" dataKey="line_k_1" stroke="black" />
        <Line type="monotone" dataKey="line_k_2" stroke="black" />
        <Line type="monotone" dataKey="line_k_3" stroke="black" />
        <Line type="monotone" dataKey="line_k_4" stroke="green" />
        <Line type="monotone" dataKey="line_o_1" stroke="green" />
        <Line type="monotone" dataKey="line_o_2" stroke="green" />
        <Line type="monotone" dataKey="line_o_3" stroke="green" />
        <Line type="monotone" dataKey="line_o_4" stroke="green" />
      </LineChart>
    </div>
  );
}
