import { FC, memo, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import "../index.scss";
import chart_1 from "@/assets/images/web/chart_1.png";
import chart_2 from "@/assets/images/web/chart_2.png";
import chart_3 from "@/assets/images/web/chart_3.png";

const MarketDynamic: FC = (): ReactElement => {
  const { t } = useTranslation();
  const [cur, setCur] = useState(0);
  const tabList = ["MUSDT", "MBTC", "METH", "MBNB"];
  return (
    <div className="market-dynamic section-box">
      <div className="section-box-header flex-row-start-center">
        <p className="title">{t(`home.marketDynamic`)}</p>
      </div>
      <div className="m-tabs">
        {tabList.map((item, i) => {
          return (
            <div
              className={`tab ${cur === i ? "z-cur" : ""}`}
              onClick={() => {
                setCur(i);
              }}
              key={i}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="chart-list flex-row-between-center">
        <div className="chart-list-item  flex-row-start-center">
          <div className="desc">
            <p>{t('home.marketCap')} USD</p>
            <p className="number-font">3476782197</p>
          </div>
          <div className="chart s-red number-font">
            <span>2%</span>
            <i className="rise-icon-red"></i>
            <img src={chart_1} alt="" />
          </div>
        </div>
        <div className="chart-list-item  flex-row-start-center">
          <div className="desc">
            <p>已发行供应量</p>
            <p className="number-font">3476782197</p>
          </div>
          <div className="chart s-yellow number-font">
            <span>2%</span>
            <i className="rise-icon-yellow"></i>
            <img src={chart_2} alt="" />
          </div>
        </div>
        <div className="chart-list-item  flex-row-start-center">
          <div className="desc">
            <p>持有人数量</p>
            <p className="number-font">34767</p>
          </div>
          <div className="chart s-blue number-font">
            <span>2%</span>
            <i className="rise-icon-blue"></i>
            <img src={chart_3} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MarketDynamic);
