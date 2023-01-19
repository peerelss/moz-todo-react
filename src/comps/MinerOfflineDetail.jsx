import React, { useState, useRef, useEffect } from "react";
import { useParams, userParams } from "react-router-dom";
import axios from "axios";
import JTest from "./JTest";
import "./test_css.css";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { Button } from "antd";
registerAllModules();
const listToLine = (list) => {
  return {
    ip: list[0],
    model: list[1],
    result: list[2],
    new: list[3],
  };
};
const MinerOfflineDetail = () => {
  const hTable = useRef(null);
  let params = useParams();
  let line = params.line;
  const [data, setData] = useState([["10.7.10.10", "s19j pro", "Empty Miner"]]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://127.0.0.1:5050/get_offline_lines/" + line
      );
      console.log(result.data.map(listToLine));
      setData(result.data.map(listToLine));
    };
    fetchData();
  }, [line]);
  const getData = () => {};
  const saveData = async () => {
    const p_data = hTable.current.hotInstance.getData();
    const params = { line: line, ips: p_data };
    console.log(params);
    const result = await axios.post(
      "http://127.0.0.1:5050/save_offline_lines",
      params
    );
    console.log(result.data);
  };
  const addNewRow = () => {};
  const updateData = () => {};
  const handleChange = () => {};
  return (
    <div className="center_div">
      <Button onClick={saveData}>保存数据</Button>
      <Button onClick={addNewRow}>add new row</Button>
      <Button onClick={updateData}>更新数据</Button>
      <div>
        <HotTable
          ref={hTable}
          data={data}
          colHeaders={["ip", "model", "result", "是否新增"]}
          columns={[
            { data: "ip", type: "text" },
            { data: "model", type: "text" },
            { data: "result", type: "text" },
            { data: "new", type: "checkbox" },
          ]}
          rowHeaders={true}
          className="htCenter htMiddle"
          width="800"
          stretchH="all"
          afterChange={handleChange}
          licenseKey="non-commercial-and-evaluation"
        />
      </div>
    </div>
  );
};

export default MinerOfflineDetail;
