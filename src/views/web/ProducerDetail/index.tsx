import { FC, memo, ReactElement } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import avatar from "@/assets/images/web/node_icon.png";
import ChainData from './components/chain-data'
import "./index.scss";
import Tabs from "@/components/Tabs";

const ProducerDetail: FC = (): ReactElement => {
  const accountTabList = [
    {
      label: "账户详情",
      children: (
        <div className="account-detail flex-row-between-stretch">
          <div className="left">
            <div className="overview flex-row-between-center">
              <div className="color-block blue">
                <p className="title">可用余额</p>
                <p className="ct">
                  <span className="number number-font">0</span> AMAX
                </p>
              </div>
              <div className="color-block pink">
                <p className="title">赎回中</p>
                <p className="ct">
                  <span className="number number-font">0</span> AMAX
                </p>
              </div>
            </div>
            <div className="flex-row-between-center data-item">
              <span className="c-909399">CPU Staked：</span>
              <span className="number-font">0.0000 AMAX</span>
            </div>
            <div className="flex-row-between-center data-item">
              <span className="c-909399">NFT Staked：</span>
              <span className="number-font">0.0000 AMAX</span>
            </div>
            <div className="flex-row-between-center data-item">
              <span className="c-909399">他人为你质押：</span>
              <span className="number-font">0.0000 AMAX</span>
            </div>
            <div className="flex-row-between-center data-item">
              <span className="c-909399">Total REX：</span>
              <span className="number-font">0.0000 AMAX</span>
            </div>
          </div>
          <div className="right">
            <div className="process-list">
              <div className="process-list-item flex-row-between-center">
                <div>
                  <div className="title number-font">RAM</div>
                  <div className="desc">已用28.09 MB/共34.65 MB</div>
                </div>
                <div className="process-wrapper">
                  <div className="process" style={{width:'20%'}}>
                    <div className="radius flex-row-center-center">20%</div>
                  </div>
                </div>
              </div>
              <div className="process-list-item flex-row-between-center">
                <div>
                  <div className="title number-font">CPU</div>
                  <div className="desc">已用∞ µs/共∞ µs</div>
                </div>
                <div className="process-wrapper">
                  <div className="process" style={{width:'60%'}}>
                    <div className="radius flex-row-center-center">60%</div>
                  </div>
                </div>
              </div>
              <div className="process-list-item flex-row-between-center">
                <div>
                  <div className="title number-font">NFT</div>
                  <div className="desc">已用∞KB/共∞KB</div>
                </div>
                <div className="process-wrapper">
                  <div className="process" style={{width:'100%'}}>
                    <div className="radius flex-row-center-center">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "智能合约",
      children:(
        <div className="smart-contract">
          <div className="smart-contract-tabs flex-row-start-center">
            <div className="smart-contract-tabs-item active">Tables</div>
            <div className="smart-contract-tabs-item">ABI</div>
          </div>
          <p className="m-t-20 m-b-20 c-303333">选择数据表名</p>
          <div className="smart-contract-tabs flex-row-start-center">
            <div className="smart-contract-tabs-item active">A1</div>
            <div className="smart-contract-tabs-item">A2</div>
            <div className="smart-contract-tabs-item">Collections</div>
            <div className="smart-contract-tabs-item">V1</div>
            <div className="smart-contract-tabs-item">V2</div>
          </div>
          <div className="condition-query">
            查询范围
            <input type="text" />
            下限（Lower Bound)
            <input type="text" />
            上限（Upper Bound)
            <input type="text" />
            查询数量
            <input type="text" />
            <button className="query-button">查询</button>
          </div>
          <table className="smart-contract-table">
            <tbody>
              <tr className="table-header">
                <td>#</td>
                <td>id（key)</td>
                <td>transaction</td>
                <td>data</td>
              </tr>
              {
                  [1,2,3,4,5].map(item=>{
                    return (
                      <tr>
                        <td>1</td>
                        <td>21</td>
                        <td>424setsession4242transactioFSA8fasfisolation98level12re</td>
                        <td>p2wewsetsession4242transactioFSA8fasfisolation98</td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </table>
        </div>
      )
    },
  ];
  return (
    <div className="producer-detail">
      <div className="producer-detail-account section-box">
        <div className="account-info">
          <img src={avatar} alt="" />
          <div className="flex-col-between-stretch">
            <p className="account-info-name">账号IDxxXXX</p>
            <p className="account-info-desc">
              由<span className="c-50BF8C">账号</span>激活
            </p>
          </div>
        </div>
        <div className="account-balance c-909399 flex-col-between-stretch">
          <p className="account-balance-title">AMAX 账户余额</p>
          <p className="account-balance-number number-font c-FA454B">
            18518545 AMAX
          </p>
        </div>
      </div>
      <div className="section-box tabs">
        <Tabs data={accountTabList} defaultActiveIndex={0} />
      </div>
      <ChainData></ChainData>
    </div>
  );
};

export default Baseweb(memo(ProducerDetail));
