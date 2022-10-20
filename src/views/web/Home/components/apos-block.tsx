import { FC, memo, ReactElement } from "react";
import "../index.scss";

const AOPSBlock: FC = (): ReactElement => {
  return (
    <div className="apos-block section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">APOS区块最新动态</p>
        <p className="header-right">
          APOS主备节点交织出块机制
          <i className="question-icon">?</i>
        </p>
      </div>
    </div>
  );
};

export default memo(AOPSBlock);
