import { FC, memo, ReactElement } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";

const BlockList: FC = (): ReactElement => {
  const _list =[]
  for (let i = 0; i < 30; i++) {
    _list.push(i)
  }
  return (
    <div className="latest-block section-box">
      <div className="latest-block-list">
        {_list.map((item, i) => {
          return (
            <ul
              className="latest-block-list-item flex-row-between-center"
              key={i}
            >
              <li className="item-title">#3762039</li>
              <li className="item-time">2022-Apr-08, 16:05:12</li>
              <li className="item-type">AMAXyreywr</li>
              <li className="item-transaction">
                交易<span className="text-red">8</span>笔
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Baseweb(memo(BlockList));
