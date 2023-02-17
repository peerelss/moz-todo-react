import React, { useState, useEffect } from "react";
import { Button, Input, message, Space } from "antd";
import axios from "axios";
import "../main_view.css";
import "./test_css.css";
const CookieManager = () => {
  const [service_ticket, setService_ticket] = useState("service_ticket");
  const [antId, setAntId] = useState("ant Id");
  const [antToken, setAntToken] = useState("ant Token");
  const [messageApi, contextHolder] = message.useMessage();
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
  //判断cookie 是否可用
  useEffect(() => {
    if (service_ticket && service_ticket.length > 20) {
      axios
        .get("http://127.0.0.1:5050/test_cookie")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [service_ticket]);
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
  const testCookies = () => {
    if (service_ticket && service_ticket.length > 20) {
      axios
        .get("http://127.0.0.1:5050/test_cookie")
        .then(function (response) {
          console.log(response.data);
          const code = response.data.code;
          if (code == 0) {
            messageApi.open({
              type: "success",
              content: "当前 cookie 可用，请放心使用其他功能",
            });
          } else {
            messageApi.open({
              type: "warning",
              content: "当前 cookie 不可用，请更新",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          messageApi.open({
            type: "error",
            content: "出问题，请联系管理员",
          });
        });
    }
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
      <Button type="primary" onClick={testCookies}>
        测试 cookies 是否可用
      </Button>
      {contextHolder}
    </div>
  );
};

export default CookieManager;
