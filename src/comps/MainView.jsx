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
      </div>
      <Outlet />
    </div>
  );
};

export default MainView;
