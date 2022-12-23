import React from "react";
import { useParams, userParams } from "react-router-dom";
const MinerOfflineDetail = () => {
  let params = useParams();
  let line = params.line;
  return <div>{line}</div>;
};

export default MinerOfflineDetail;
