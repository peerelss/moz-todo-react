import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import JTest from "./JTest";
import "../main_view.css";
import "./test_css.css";
import { Button, Input } from "antd";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
export default function MinerZero() {
  const [data, setData] = useState([]);
  const navi = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:5050/get_all_line_config");
      console.log(result.data);
      setData(result.data.data);
    };
    fetchData();
  }, []);
  const jumpTo = () => {
    navi("/cook");
  };
  return (
    <div>
      <Button onClick={jumpTo}>页面跳转到CookieManage</Button>
      <div className="nav_container ">
        {data.map((line) => (
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to={`/zero/${line.name_short}`}
          >
            <Button type="default" className="b-title" key={line}>
              {line.name_full}
            </Button>
          </NavLink>
        ))}
      </div>
      <Outlet></Outlet>
    </div>
  );
}
