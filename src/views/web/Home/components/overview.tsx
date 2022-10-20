import { FC, memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import curBlockPng from "@/assets/images/web/cur_block.png";
import latestBlockPng from "@/assets/images/web/latest_block.png";
import nodesPng from "@/assets/images/web/nodes.png";
import statusPng from "@/assets/images/web/status.png";
import fresh_sign from "@/assets/images/web/fresh_sign.png";
import forward from "@/assets/images/web/forward.png";
import header_logo from "@/assets/images/web/header_logo.png";
import amax_banner from "@/assets/images/web/amax_banner.png";

import "../index.scss";

const OverView: FC = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <div className="m-situation-blocks">
      <div className="bars-4">
        <div className="bar-item s-shadow animate">
          <div className="bar-item-title flex-row-between-center">
            <div className="title-wrapper">
              <img className="title-icon" src={curBlockPng} alt="" />
              当前区块
            </div>
            <div className="number number-font">3764565</div>
          </div>
          <div className="bar-item-content flex-row-between-center">
            <div className="content left">
              <div className="wrapper">
                每秒处理交易
                <p className="number-font">56</p>
              </div>
              <div className="wrapper">
                历史最高
                <p className="number-font text-red">3782</p>
              </div>
            </div>
            <div className="content right">
              <div className="wrapper">
                每秒处理操作
                <p className="number-font">86</p>
              </div>
              <div className="wrapper">
                历史最高
                <p className="number-font text-red">8782</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bar-item s-shadow animate">
          <div className="bar-item-title">
            <div className="title-wrapper">
              <img className="title-icon" src={nodesPng} alt="" />
              {t("common.header.nav.nodes")}
            </div>
          </div>
          <div className="bar-item-content flex-row-between-center">
            <div className="point left">
              <p className="point-title">当前生产节点</p>
              <p>Armonia1</p>
            </div>
            <div>
              <img src={forward}></img>
            </div>
            <div className="point right">
              <p className="point-title t-right">下一个生产节点</p>
              <p className="t-right">Armonia2</p>
            </div>
          </div>
        </div>
        <div className="bar-item  s-shadow no-mb animate">
          <div className="bar-item-title  flex-row-between-center">
            <div className="title-wrapper">
              <img className="title-icon" src={latestBlockPng} alt="" />
              最新不可逆区块
            </div>
            <img className="fresh-sign" src={fresh_sign} alt="" />
          </div>
          <div className="bar-item-content flex-row-between-center fresh">
            <p className="number-font">3764400</p>
          </div>
        </div>
        <div className="bar-item  s-shadow no-mb  animate">
          <div className="bar-item-title">
            <div className="title-wrapper">
              <img className="title-icon" src={statusPng} alt="" />
              实时状况
            </div>
          </div>
          <div className="bar-item-content">
            <div className="content-wrapper flex-row-between-center">
              <p className="left">CPU上限</p>
              <p className="right number-font">0.200s/0.200s</p>
            </div>
            <div className="content-wrapper flex-row-between-center">
              <p className="left">内存RAM</p>
              <p className="right  number-font">3/28GB</p>
            </div>
            <div className="content-wrapper flex-row-between-center">
              <p className="left">NET带宽上限</p>
              <p className="right  number-font">1024 KB/1000 MB</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bars-1 section-box animate">
        <div className="bars-header flex-row-between-center">
          <div className="header-left">
            <img src={header_logo} alt="" />
          </div>
          {/* <div className="header-right">
            <div className="trend number-font">
              1.43%
              <img src={rise_icon_green} alt="" />{" "}
            </div>
            <p className="number-font">
              $2.591<span className="c-909399 unit">/USD</span>
            </p>
          </div> */}
        </div>
        <div className="amax-list">
          <div className="amax-list-item flex-row-between-center">
            <div className="flex-auto c-909399 flex-row-start-center">
              <div className="title">AMAX总供应量</div>
              <div className="progress progress-60 "></div>
            </div>
            <div>
              <span className="number-font">347364328947237</span>
              <span className="c-909399 unit">/AMAX</span>
            </div>
          </div>
          <div className="amax-list-item flex-row-between-center">
            <div className="flex-auto c-909399 flex-row-start-center">
              <div className="title">已质押</div>
              <div className="progress progress-40"></div>
            </div>
            <div>
              <span className="number-font">347947237</span>
              <span className="c-909399 unit">/AMAX</span>
            </div>
          </div>
        </div>
        <img className="banner" src={amax_banner} alt="" />
        <div className="bottom-text flex-row-between-center">
          <p className="c-909399">当前内存价格</p>
          <p>
            <span className="number number-font">0.00335</span>/AMAX/KB
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(OverView);
