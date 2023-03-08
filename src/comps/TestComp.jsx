import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
export default function TestComp() {
  const ws = (useRef < WebSocket) | (null > null);
  const [message, setMessage] = useState("");
  //启动
  useLayoutEffect(() => {
    ws.current = new WebSocket("ws://172.16.12.80:5000/");
    ws.current.onmessage = (e) => {
      setMessage(e.data);
    };
    return () => {
      ws.current?.close();
    };
  }, [ws]);

  return (
    <div className="App">
      <div className="container">{message}</div>
    </div>
  );
}
