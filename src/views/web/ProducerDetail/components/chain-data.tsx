import Tabs from "@/components/Tabs";
import { FC, memo, ReactElement, useState } from "react";
import block_icon from "@/assets/images/web/block_icon.png";
import chain_icon from "@/assets/images/web/chain_icon.png";
import search_icon from "@/assets/images/web/search_icon.png";
import node_icon from "@/assets/images/web/node_icon.png";
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import "../index.scss";

const ChainData: FC = (): ReactElement => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [chainDataList, setChainDataList] = useState(
    (() => {
      let list = [];
      for (let i = 0; i < 12; i++) {
        list.push(
          <div
            className={`chain-data-list-item${i % 2 === 0 ? " dark" : ""}`}
            key={i}
          >
            <img src={chain_icon} alt="" /> prospectorsg
            <p className="dfs number-font">
              190,749.9181 <span className="orange">DFS</span>
            </p>
          </div>
        );
      }
      return list;
    })()
  );
  const [isUnfold, setIsUnfold] = useState(false);
  const toggleMore = () => {
    if (!isUnfold) {
      for (let i = 0; i < 6; i++) {
        chainDataList.push(
          <div
            className={`chain-data-list-item${i % 2 === 0 ? " dark" : ""}`}
            key={i}
          >
            <img src={chain_icon} alt="" /> prospectorsg
            <p className="dfs number-font">
              190,749.9181 <span className="orange">DFS</span>
            </p>
          </div>
        );
      }
    } else {
      setChainDataList(chainDataList.slice(0, 12));
    }
    setIsUnfold(!isUnfold);
  };
  const chainTabList = [
    {
      label: "Tokens（19）",
      children: (
        <>
          <div className="p-t-16 fs-14">
            Total Tokens Value: $2.69 USD / 1.2117 EOS
          </div>
          <div className="chain-data-list">{chainDataList}</div>
          <div
            className="toggle-button"
            onClick={() => {
              toggleMore();
            }}
          >
            {isUnfold ? "收起" : "展开"}
            <i className={`arrow-down${isUnfold ? " up" : ""}`}></i>
          </div>
        </>
      ),
    },
    {
      label: "Keys（4）",
    },
    {
      label: "NFT（2）",
      children: (
        <div className="p-t-16">
          <div className="nft-search flex-row-start-center">
            <img src={search_icon} alt="" />
            <input type="text" placeholder="搜索NFT名字或者Asset ID" />
          </div>
          <table className="nft-table common-table">
            <tbody>
              <tr className="table-header">
                <td>Logo</td>
                <td>NFT名字</td>
                <td>Asset ID</td>
                <td>专辑</td>
                <td>作者</td>
                <td>当前编号/全部发行量</td>
              </tr>
              <tr>
                <td>
                  <img className="logo" src={node_icon} alt="" />
                </td>
                <td>WAX Mainnet Launch Pin</td>
                <td className="s-green">1099608412763</td>
                <td>waxpins</td>
                <td>waxping</td>
                <td>#1595/1000000</td>
              </tr>
              <tr>
                <td>
                  <img className="logo" src={node_icon} alt="" />
                </td>
                <td>WAX Mainnet Launch Pin</td>
                <td className="s-green">1099608412763</td>
                <td>waxpins</td>
                <td>waxping</td>
                <td>#1595/1000000</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      label: "为他人激活（2）",
      children:(
        <div className="p-t-16 fs-14">
          <div className="activate-list flex-row-start-center">
            {
              [1,2,3,4,5,6,].map(item=>{
                return(
                  <div className="activate-list-item flex-col-between-center">
                    <div className="name flex-row-center-center">
                      velah@le.ac
                    </div>
                    <div className="detail-btn flex-row-center-center">
                      激活详情
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    },
  ];
  return (
    <div className="section-box chain-data">
      <DateTimeRangePicker onChange={onChange} value={value} />
      <div className="chain-data-title">
        <img src={block_icon} alt="" /> Chain Data
      </div>
      <Tabs data={chainTabList} defaultActiveIndex={3} />
    </div>
  );
};

export default memo(ChainData);
