import React, { useState, useRef } from "react";
import { HotTable } from "@handsontable/react";

import "handsontable/dist/handsontable.full.css";
import { Button } from "antd";

const LineConfig = () => {
  const hTable = useRef(null);
  const data = [
    {
      id: 1,
      shortName: "e",
      zoneId: "434291821984662228",
      zoneName: "Rockdale-E",
    },
    {
      id: 2,
      shortName: "i",
      zoneId: "434292085760250758",
      zoneName: "Rockdale-I",
    },
    {
      id: 3,
      shortName: "j",
      zoneId: "434292217180374161",
      zoneName: "Rockdale-J",
    },
    {
      id: 4,
      shortName: "k",
      zoneId: "434293352171621680",
      zoneName: "Rockdale-K-East",
    },
    { id: 5, shortName: "d", zoneId: "0", zoneName: "Default Zone" },
  ];

  const [newData, setNewData] = useState(data);
  const handleChange = (changes, source) => {
    if (!changes) return;

    changes.forEach(([rowIndex, propertyNam, oldValue, newValue]) => {
      console.log(propertyNam, oldValue, newValue);
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: p_data }),
    }).then((response) => {
      console.log(response);
    });
  };
  const updateData = () => {};
  return (
    <div className="center_div">
      <h2>运维线路配置</h2>
      <div className="sheet_color">
        <HotTable
          ref={hTable}
          data={data}
          colHeaders={["Short_name", "Zone_id", "Zone_Name"]}
          columns={[
            { data: "shortName", type: "text" },
            { data: "zoneId", type: "text" },
            { data: "zoneName", type: "text" },
          ]}
          rowHeaders={true}
          width="600"
          className="htCenter htMiddle"
          height="300"
          stretchH="all"
          afterChange={handleChange}
          licenseKey="non-commercial-and-evaluation"
        />
      </div>
      <Button onClick={saveData}>保存数据</Button>
      <Button onClick={addNewRow}>add new row</Button>
      <Button onClick={updateData}>更新数据</Button>
    </div>
  );
};

export default LineConfig;
