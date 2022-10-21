import { FC, memo, ReactElement } from "react";
import "../index.scss";

const LatestBlock: FC = (): ReactElement => {
  return (
    <div className="latest-block section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">最新区块</p>
        <div className="flex-row-start-center">更多区块 <i className="arrow-icon"></i></div>
      </div>
      <div className="latest-block-list">
        {
          [1,2,3,4].map((item,i) => {
            return (
              <ul className="latest-block-list-item flex-row-between-center" key={i}>
                <li className="item-title">#3762039</li>
                <li className="item-time">2022-Apr-08, 16:05:12</li>
                <li className="item-type">AMAXyreywr</li>
                <li className="item-transaction">
                    交易<span className="text-red">8</span>笔
                </li>
              </ul>
            )
          })
        }
      </div>
    </div>
  );
};

export default memo(LatestBlock);
