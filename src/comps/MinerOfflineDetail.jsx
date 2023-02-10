import React, { useState, useRef, useEffect } from "react";
import { useParams, userParams } from "react-router-dom";
import axios from "axios";
import "./test_css.css";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { Button } from "antd";
registerAllModules();
const ipTolist = (ip) => {
  return {
    ip: ip,
    line: " ",
    memo: " ",
    model: " ",
    operator: " ",
    result: " ",
  };
};
const listToLine = (list) => {
  return {
    ip: list.ip,
    line: list.line,
    memo: list.memo,
    model: list.model_miner,
    operator: list.operator,
    result: list.result,
  };
};
const MinerOfflineDetail = () => {
  const hTable = useRef(null);
  const hTable_know = useRef(null);
  let params = useParams();
  let line = params.line;
  const [data, setData] = useState([["10.7.10.10", "s19j pro", "Empty Miner"]]);
  const [newData, setNewData] = useState([]);
  const [knowData, setKnowData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://127.0.0.1:5050/get_new_offline_ip_list/" + line
      );
      console.log(result.data.result.map(ipTolist));
      setNewData(result.data.result.map(ipTolist));
    };
    fetchData();
  }, [line]);
  const getData = () => {};
  const saveData = async () => {
    const p_data = hTable.current.hotInstance.getData();
    const params = { line: line, ips: p_data };
    console.log(params);
    const result = await axios.post("", params);
    console.log(result.data);
  };
  const addNewRow = () => {};
  const updateData = () => {};
  const handleChange = () => {};

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://127.0.0.1:5050/get_offline_lines_known/" + line
      );
      console.log(result.data.data.map(listToLine));
      setKnowData(result.data.data.map(listToLine));
    };
    fetchData();
  }, [line]);
  const saveKnowData = async () => {
    const p_data = hTable_know.current.hotInstance.getData();
    const params = { line: line, ips: p_data };
    console.log(params);
    const result = await axios.post(
      "http://127.0.0.1:5050/save_offline_lines",
      params
    );
    console.log(result.data);
  };
  const addNewKnowRow = () => {};

  /***
   * 对于每一次的改动，将传给后台服务器，并且保存在数据里。
   * 改动分为两种，一种是删除ip,另一种是新增ip或者针对已有ip进行修改
   * 对两种进行组合，一种是 {delete:ips}具体为{action:'delete';target:ips}
   * 另一种是{update:models} 具体为{action:'update':target:models}
   * 具体的判断逻辑为
   * 1：如果修改地方包含不包含ip,则一定为update
   * 2: 如果修改的地方包含ip,则记录new_ip,和old_ip
   * if new_ip ===null 则合并为 detele  old_ip 操作
   *  else if old_ip====null 则 操作为 update model
   *  else if 两者都不为空，则 delelte old_ip 然后 update model
   */

  let changeAction = [];
  const margeAction = (ip_pre) => {
    changeAction.map((action, i) => {
      if (action[1] === ip_pre) {
        changeAction.splice(i, 1);
      }
    });
  };
  const postAction2Server = async () => {
    if (changeAction.length > 0) {
      const result = await axios.post(
        "http://127.0.0.1:5050/update_offline_data_by_line/" + line,
        { line: line, action: changeAction }
      );
      console.log(result.data);
      changeAction = [];
    }
  };
  const updateKnowData = () => {};
  const handleKnownChange = (changes) => {
    changes?.forEach(([row, prop, oldValue, newValue]) => {
      console.log(knowData[row]);
      console.log(row, prop, oldValue, newValue);
      if (prop === "ip") {
        if (newValue === null) {
          margeAction(oldValue);
          changeAction.push(["delete", oldValue, oldValue]);
        } else {
          if (oldValue) {
            margeAction(oldValue);
            changeAction.push(["delete", oldValue, oldValue]);
          }
          margeAction(knowData[row].ip);
          changeAction.push(["update", knowData[row].ip, knowData[row]]);
        }
      } else if (knowData[row].ip) {
        margeAction(knowData[row].ip);
        changeAction.push(["update", knowData[row].ip, knowData[row]]);
      }
    });
    console.log(changeAction);
    postAction2Server();
  };
  return (
    <div className="offline_div">
      <div className="sheet_div">
        <h2>新增离线矿机</h2>

        <HotTable
          ref={hTable}
          data={newData}
          colHeaders={["ip", "model", "result", "备注", "线路", "操作者"]}
          columns={[
            { data: "ip", type: "text" },
            { data: "model", type: "text" },
            { data: "result", type: "text" },
            { data: "memo", type: "text" },
            { data: "line", type: "text", editor: false },
            { data: "operator", type: "text" },
          ]}
          rowHeaders={true}
          className="htCenter htMiddle"
          width="800"
          minSpareRows="3"
          stretchH="all"
          afterChange={handleChange}
          licenseKey="non-commercial-and-evaluation"
        />
      </div>
      <div className="sheet_div">
        <h2>已知离线矿机</h2>
        <br></br>
        <Button onClick={saveKnowData}>保存已知矿机数据</Button>
        <Button onClick={addNewKnowRow}>add new row</Button>
        <Button onClick={updateKnowData}>更新已知离线矿机数据</Button>
        <br></br>
        <br></br>
        <HotTable
          ref={hTable_know}
          data={knowData}
          colHeaders={["ip", "model", "result", "备注", "线路", "操作者"]}
          columns={[
            { data: "ip", type: "text" },
            { data: "model", type: "text" },
            { data: "result", type: "text" },
            { data: "memo", type: "text" },
            { data: "line", type: "text" },
            { data: "operator", type: "text" },
          ]}
          rowHeaders={true}
          className="htCenter htMiddle"
          width="800"
          height="600"
          stretchH="all"
          minSpareRows="3"
          afterChange={handleKnownChange}
          licenseKey="non-commercial-and-evaluation"
        />
      </div>
    </div>
  );
};

export default MinerOfflineDetail;
