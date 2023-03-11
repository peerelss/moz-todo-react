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
    line_1: data.line_1,
    line_2: data.line_2,
    line_3: data.line_3,
    line_4: data.line_4,
    line_5: data.line_5,
    line_6: data.line_6,
    line_7: data.line_7,
    line_8: data.line_8,
    line_9: data.line_9,
    line_10: data.line_10,
    line_11: data.line_11,
    line_12: data.line_12,
    line_13: data.line_13,
    line_14: data.line_14,
    line_15: data.line_15,
    line_16: data.line_16,
    line_17: data.line_17,
    line_18: data.line_18,
    line_19: data.line_19,
    line_20: data.line_20,
  };
};

const data_2_monitor_miner_plus = (data) => {
  return {
    name: data.name,
    Rockdale_E: data.Rockdale_E,
    Rockdale_I: data.Rockdale_I,
    Rockdale_J: data.Rockdale_J,
    Rockdale_K_East: data.Rockdale_K_East,
    Rockdale_K_West: data.Rockdale_K_West,
    Rockdale_K_West_1: data.Rockdale_K_West_1,
    Rockdale_O: data.Rockdale_O,
  };
};
export default function MonitorHashRate() {
  const [lineData, setLineData] = useState();
  const [lineDataMinerPlus, setLineDataMinerPlus] = useState();
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

  const updateLineDataMinerPlus = async () => {
    const result = await axios(
      "http://127.0.0.1:5050/get_all_line_hash_rate_monitor_miner_plus"
    );
    const data_new = result.data.result.map(data_2_monitor_miner_plus);

    setLineDataMinerPlus(data_new);
  };

  useEffect(() => {
    updateLineData();
    updateLineDataMinerPlus();
  }, []);
  return (
    <div>
      {" "}
      <div>
        <LineChart
          width={1300}
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
            dataKey="line_1"
            stroke="red"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="line_2" stroke="red" />
          <Line type="monotone" dataKey="line_3" stroke="red" />
          <Line type="monotone" dataKey="line_4" stroke="red" />
          <Line type="monotone" dataKey="line_5" stroke="red" />
          <Line type="monotone" dataKey="line_6" stroke="black" />
          <Line type="monotone" dataKey="line_7" stroke="black" />
          <Line type="monotone" dataKey="line_8" stroke="black" />
          <Line type="monotone" dataKey="line_9" stroke="black" />
          <Line type="monotone" dataKey="line_10" stroke="black" />
          <Line type="monotone" dataKey="line_11" stroke="black" />
          <Line type="monotone" dataKey="line_12" stroke="green" />
          <Line type="monotone" dataKey="line_13" stroke="green" />
          <Line type="monotone" dataKey="line_14" stroke="green" />
          <Line type="monotone" dataKey="line_15" stroke="green" />
          <Line type="monotone" dataKey="line_16" stroke="green" />
          <Line type="monotone" dataKey="line_17" stroke="blue" />
          <Line type="monotone" dataKey="line_18" stroke="blue" />
          <Line type="monotone" dataKey="line_19" stroke="blue" />
          <Line type="monotone" dataKey="line_20" stroke="blue" />
        </LineChart>
      </div>
      <div>
        <LineChart
          width={1300}
          height={700}
          data={lineDataMinerPlus}
          margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Rockdale_E"
            stroke="red"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Rockdale_I" stroke="red" />
          <Line type="monotone" dataKey="Rockdale_J" stroke="red" />
          <Line type="monotone" dataKey="Rockdale_K_East" stroke="red" />
          <Line type="monotone" dataKey="Rockdale_K_West" stroke="black" />
          <Line type="monotone" dataKey="Rockdale_K_West_1" stroke="black" />
          <Line type="monotone" dataKey="Rockdale_O" stroke="black" />
        </LineChart>
      </div>
    </div>
  );
}
