import React from "react";
import "../main_view.css";
import { Outlet, NavLink, Link } from "react-router-dom";
const MainView = () => {
  return (
    <div>
      <div className="nav_container">
        {" "}
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav_item_active" : "nav_item";
          }}
          to="/line"
        >
          线路配置
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav_item_active" : "nav_item";
          }}
          to="/offline"
        >
          离线管理
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav_item_active" : "nav_item";
          }}
          to="/zero"
        >
          0算力处理
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav_item_active" : "nav_item";
          }}
          to="/abnormal"
        >
          挖矿异常
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav_item_active" : "nav_item";
          }}
          to="/run"
        >
          运行管理
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav_item_active" : "nav_item";
          }}
          to="/cook"
        >
          Cookie管理
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MainView;
