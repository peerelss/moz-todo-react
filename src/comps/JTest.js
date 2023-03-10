import React, { useRef, useEffect } from "react";
import jspreadsheet from "jspreadsheet-ce";
import { Button, Input, Space } from "antd";
import "./jspreadsheet.css";

export default function App({ data, saveData }) {
  const jRef = useRef(null);
  const changed = (instance, cell, x, y, value) => {
    console.log("changed");
    console.log([x, y]);
    console.log(jRef.current.jexcel.getRowData(y));
  };
  const options = {
    data: data,
    minDimensions: [4, 10],
    colWidths: [200, 200, 200, 200],
    defaultRowHeight: 5,
    pagination: 20,
    onchange: changed,
  };

  useEffect(() => {
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options);
    } else {
      jRef.current.jexcel.setData(data);
    }
    console.log(data);
  }, [data]);

  const addRow = () => {
    jRef.current.jexcel.insertRow();
  };
  const saveDate2Father = () => {
    const d = jRef.current.jexcel.getData();
    saveData(d);
  };
  const getDataFromFather = () => {};

  return (
    <div>
      <div ref={jRef} />
      <br />
      <Space>
        {" "}
        <Button type="default" onClick={getDataFromFather}>
          获取数据
        </Button>
        <Button type="default" onClick={addRow}>
          添加一行
        </Button>
        <Button type="default" onClick={saveDate2Father}>
          保存数据
        </Button>
      </Space>
    </div>
  );
}
