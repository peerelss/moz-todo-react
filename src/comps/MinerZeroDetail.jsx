import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
    operate: list[2],
    fan_no: list[3],
    board_no: list[4],
  };
};
const MinerZeroDetail = () => {
  const hTable = useRef(null);
  let params = useParams();
  let line = params.line;
  const [data, setData] = useState([["10.7.10.10", "s19j pro", "Empty Miner"]]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://127.0.0.1:5050/get_zero_miner_by_line/" + line
      );
      console.log(result.data.map(listToLine));
      setData(result.data.map(listToLine));
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
      <div className="button_div"></div>

      <div className="sheet_div">
        <Button onClick={saveData}>保存数据</Button>
        <Button onClick={addNewRow}>add new row</Button>
        <Button onClick={updateData}>更新数据</Button>
        <br></br>
        <br></br>
        <HotTable
          ref={hTable}
          data={data}
          colHeaders={["ip", "model", "operate", "fan_no", "board_no"]}
          columns={[
            { data: "ip", type: "text" },
            { data: "model", type: "text" },
            { data: "operate", type: "text" },
            { data: "fan_no", type: "text" },
            { data: "board_no", type: "text" },
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

export default MinerZeroDetail;
