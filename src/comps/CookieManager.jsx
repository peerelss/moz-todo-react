import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import "../main_view.css";
import "./test_css.css";
const CookieManager = () => {
  const [service_ticket, setService_ticket] = useState("service_ticket");
  const [antId, setAntId] = useState("ant Id");
  const [antToken, setAntToken] = useState("ant Token");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5050/getAllCookie")
      .then(function (response) {
        console.log(response.data);
        setService_ticket(response.data.service_ticket);
        setAntId(response.data.ANTSENTRYID);
        setAntToken(response.data.Ant_Token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const changeService_ticket = (e) => {
    setService_ticket(e.target.value);
  };
  const changeAntId = (e) => {
    setAntId(e.target.value);
  };
  const changeAntToken = (e) => {
    setAntToken(e.target.value);
  };
  const setCookies = () => {
    localStorage.setItem("service_ticket", service_ticket);
    localStorage.setItem("antId", antId);
    localStorage.setItem("antToken", antToken);

    axios
      .post("http://127.0.0.1:5050/setAllCookie", {
        service_ticket: service_ticket,
        antId: antId,
        antToken: antToken,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="sheet_div">
      <div>
        ANTSENTRYID:
        <Input
          placeholder="ANTSENTRYID"
          value={antId}
          onChange={changeAntId}
        ></Input>
      </div>
      <div>
        {" "}
        service_ticket:
        <Input
          placeholder="service_ticket"
          value={service_ticket}
          onChange={changeService_ticket}
        ></Input>
      </div>
      <div>
        {" "}
        Ant-Token :
        <Input
          placeholder="Ant-Token"
          value={antToken}
          onChange={changeAntToken}
        ></Input>
      </div>
      <Button type="primary" onClick={setCookies}>
        设置cookie
      </Button>
    </div>
  );
};

export default CookieManager;
