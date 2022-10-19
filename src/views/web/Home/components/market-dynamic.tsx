import { FC, memo, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import "../index.scss";

const MarketDynamic: FC = (): ReactElement => {
  const { t } = useTranslation();
  const [cur,setCur] = useState(0)
  const tabList = ['MUSDT','APL']
  return (
    <div className="market-dynamic section-box">
      <div className="section-box-header flex-row-start-center">
        <p className="title">市场动态</p>
      </div>
      <div className="m-tabs">
        {
          tabList.map((item,i)=>{
           return (
            <div className={`tab ${cur === i ?'z-cur':""}`}  onClick={()=>{setCur(i)}}>{item}</div>
           )
          })
        }
      </div>
    </div>
  );
};

export default memo(MarketDynamic);
