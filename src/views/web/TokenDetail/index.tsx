import { FC, memo, ReactElement } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import node_icon from "@/assets/images/web/node_icon.png";
import trend_icon from "@/assets/images/web/trend_icon.png";
import "./index.scss";

const TokenDetail: FC = (): ReactElement => {
  const _list =[]
  for (let i = 0; i < 30; i++) {
    _list.push(i)
  }
  return (
    <div className="token-detail">
      <div className="section-box">
        <div className="flex-row-between-start">
          <div className="flex-row-center-stretch">
            <img className="token-logo" src={node_icon} alt="" />
            <div className="flex-col-between-start">
              <div>
                <p className="token-title">AMAX</p>
                <p className="c-50BF8C">amax.token</p>
              </div>
              <div className="c-50BF8C">官网</div>
            </div>
          </div>
          <div className="token-number flex-row-start-center">
            <span className="fs-20 number-font">2.22331 <span className="fs-14">USD</span></span>
            <div className="token-trend">＋1.82%</div>
          </div>
        </div>
        <div className="number-list">
          <div className="number-list-item">
            <div>持有者地址数量</div>
            <div className="number-font">3489929599845</div>
          </div>
          <div className="number-list-item">
            <div>已发行供应量</div>
            <div className="number-font">133489924 AMAX</div>
          </div>
          <div className="number-list-item">
            <div>日交易量</div>
            <div className="number-font">
              <p>26,112,715,539.92 USD</p>
              <p>677,106.8 AMAX</p>
            </div>
          </div>
          <div className="number-list-item">
            <div>最大供应量</div>
            <div className="number-font">3468489924 AMAX</div>
          </div>
        </div>
      </div>
      <div className="rank-table section-box">
        <div className="section-box-header">
          <p className="title"><img src={trend_icon} alt="" /> 持有者地址排名</p>
        </div>
        <table className="common-table">
          <tr className="table-header text-align-between">
            <td>排名</td>
            <td>账户名</td>
            <td>AMAX数量</td>
          </tr>
          {
            _list.map((item,i)=>{
              return (
                <tr className="text-align-between">
                  <td>1</td>
                  <td className="c-50BF8C" >amax.token</td>
                  <td className="number-font" >47849233</td>
                </tr>
              )
            })
          }
        </table>
      </div>
    </div>
  );
};

export default Baseweb(memo(TokenDetail));
