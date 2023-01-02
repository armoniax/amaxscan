import React, { memo } from "react";
import "./index.scss";


const NoData: React.FunctionComponent = () => {
  return (
    <div className="no-data">No data</div>
  );
};

export default memo(NoData);
