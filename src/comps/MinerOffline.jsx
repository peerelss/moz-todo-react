import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import JTest from "./JTest";
import "./test_css.css";
import { Button, Input } from "antd";
import { Outlet, NavLink, Link } from "react-router-dom";
export default function MinerOffline() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:5050/get_offline_lines");
      console.log(result.data);
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="box ">
        {data.map((line) => (
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to={`/offline/${line}`}
          >
            <Button type="default" className="b-title" key={line}>
              {line}
            </Button>
          </NavLink>
        ))}
      </div>
      <Outlet></Outlet>
    </div>
  );
}
