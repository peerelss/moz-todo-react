import React, { useState, useRef, useEffect } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { Button } from "antd";
registerAllModules();
const LineConfig = () => {
  const hTable = useRef(null);
  const data = [
    {
      id: 1,
      name_short: "e",
      zone_id: "434291821984662228",
      name_full: "Rockdale-E",
      under_control: false,
    },
    {
      id: 2,
      name_short: "i",
      zone_id: "434292085760250758",
      name_full: "Rockdale-I",
      under_control: false,
    },
    {
      id: 3,
      name_short: "j",
      zone_id: "434292217180374161",
      name_full: "Rockdale-J",
    },
    {
      id: 4,
      name_short: "k",
      zone_id: "434293352171621680",
      name_full: "Rockdale-K-East",
      under_control: true,
    },
  ];

  const [newData, setNewData] = useState(data);
  const handleChange = (changes, source) => {
    if (!changes) return;

    changes.forEach(([rowIndex, propertyNam, oldValue, newValue]) => {
      newData[rowIndex] = {
        ...newData[rowIndex],
        [propertyNam]: `${newValue}`,
      };
      console.log(newData[rowIndex]);
    });

    setNewData(newData);
  };
  const addNewRow = () => {
    hTable.current.hotInstance.alter(
      "insert_row",
      hTable.current.hotInstance.countRows(),
      1
    );
  };
  const saveData = () => {
    const p_data = hTable.current.hotInstance.getData();
    console.log(p_data);
    fetch("http://127.0.0.1:5050/save_config_line_data", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: p_data }),
    }).then((response) => {});
  };
  const fetchTodos = async () => {
    const response = await fetch("http://127.0.0.1:5050/get_all_line_config");
    const data = await response.json();
    console.log(data.data);
    hTable.current.hotInstance.loadData(data.data);
  };
  useEffect(() => {
    //  fetchTodos();
  }, []);
  const updateData = () => {
    // fetchTodos();
  };
  return (
    <div className="center_div">
      <h2>运维线路配置</h2>
      <Button onClick={saveData}>保存数据</Button>
      <Button onClick={addNewRow}>add new row</Button>
      <Button onClick={updateData}>更新数据</Button>
      <div className="sheet_color">
        <HotTable
          ref={hTable}
          data={data}
          colHeaders={["Short_name", "Zone_Name", "Zone_id", "是否启用"]}
          columns={[
            { data: "name_short", type: "text" },
            { data: "name_full", type: "text" },
            { data: "zone_id", type: "text" },
            { data: "under_control", type: "checkbox" },
          ]}
          rowHeaders={true}
          width="600"
          className="htCenter htMiddle"
          height="800"
          stretchH="all"
          afterChange={handleChange}
          licenseKey="non-commercial-and-evaluation"
        />
      </div>
    </div>
  );
};

export default LineConfig;
