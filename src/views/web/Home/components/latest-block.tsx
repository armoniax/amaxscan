import { FC, memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import pulldown_icon from '@/assets/images/web/pulldown_icon.png'
import "../index.scss";

const LatestBlock: FC = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <div className="latest-block section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">最新区块</p>
        <a className="flex-row-start-center">更多区块 <i className="arrow-icon"></i></a>
      </div>
      <div className="latest-block-list">
        {
          [1,2,3,4].map(() => {
            return (
              <ul className="latest-block-list-item flex-row-between-center">
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
