import React, { useRef, useEffect } from "react";
import jspreadsheet from "jspreadsheet-ce";
 
import './jspreadsheet.css';
 
export default function App({ data,saveData}) {
  const jRef = useRef(null);
  const options = {
    data:data,
    minDimensions: [4, 10],
    colWidths: [200, 200, 200,200]
  };
 
  useEffect(() => {
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options);
    } else {
      jRef.current.jexcel.setData(data)
    }
  }, [data]);
 
  const addRow = () => {
    jRef.current.jexcel.insertRow();
  };
  const saveDate2Father = () => {
    const  d = jRef.current.jexcel.getData();
    saveData(d);
  }
  return (
    <div>
      <div ref={jRef} />
      <br />
      <input type="button" onClick={addRow} value="Add new row" />
       <br />
      <input type="button" onClick={saveDate2Father} value="saveData from father" />
    </div>
  );
}