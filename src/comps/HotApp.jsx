import React, { useState, useRef } from "react";
import { HotTable } from "@handsontable/react";

import "handsontable/dist/handsontable.full.css";
import { Button } from "antd";

const HotApp = () => {
  const hTable = useRef(null);
  const data = [
    { id: 1, name: "Tanaka", age: 20, address: "fukuoka" },
    { id: 2, name: "Yamada", age: 31, address: "saga" },
    { id: 3, name: "Sato", age: 42, address: "nagasaki" },
    { id: 4, name: "Suzuki", age: 53, address: "ooita" },
    { id: 5, name: "Yamamoto", age: 64, address: "miyazaki" },
  ];
  const kyushu = [
    "fukuoka",
    "saga",
    "nagasaki",
    "ooita",
    "kumamoto",
    "miyazaki",
    "kagosima",
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
  return (
    <div>
      <HotTable
        ref={hTable}
        data={data}
        colHeaders={["Name", "Age", "Address"]}
        columns={[
          { data: "name", type: "text" },
          { data: "age", type: "text" },
          { data: "address", type: "text", source: kyushu },
        ]}
        rowHeaders={true}
        width="600"
        height="300"
        stretchH="all"
        afterChange={handleChange}
        licenseKey="non-commercial-and-evaluation"
      />
      <Button onClick={addNewRow}>add new row</Button>
    </div>
  );
};

export default HotApp;
