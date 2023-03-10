import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./test_css.css";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { Button } from "antd";
import HashAbnormal from "./HashAbnormal";
registerAllModules();
const listToLine = (list) => {
  return {
    ip: list[0],
    model: list[1],
    online: list[2],
  };
};
const HashAbnormalDetail = () => {
  const hTable = useRef(null);
  let params = useParams();
  let line = params.line;
  const [data, setData] = useState([["10.7.10.10", "s19j pro", "Empty Miner"]]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://127.0.0.1:5050/getHashAbnormalByLine/" + line
      );
      const data = result.data;
      if (data.code === "0") {
        console.log(data);
        setData(data.result.map(listToLine));
      }

      //  setData(result.data.map(listToLine));
    };
    fetchData();
  }, [line]);
  const getData = () => {};
  const saveData = async () => {};
  const addNewRow = () => {};
  const updateData = () => {};
  const handleChange = () => {};
  return (
    <div className="container_div">
      <div className="sheet_div">
        <h2>挖矿异常矿机</h2>
        <Button onClick={saveData}>保存数据</Button>
        <Button onClick={addNewRow}>add new row</Button>
        <Button onClick={updateData}>更新数据</Button>
        <HotTable
          ref={hTable}
          data={data}
          colHeaders={["ip", "model", "operate", "fan_no", "board_no"]}
          columns={[
            { data: "ip", type: "text" },
            { data: "model", type: "text" },
            { data: "online", type: "text" },
          ]}
          rowHeaders={true}
          className="htCenter htMiddle"
          width="800"
          height="600"
          stretchH="all"
          afterChange={handleChange}
          licenseKey="non-commercial-and-evaluation"
        />
      </div>
    </div>
  );
};

export default HashAbnormalDetail;
