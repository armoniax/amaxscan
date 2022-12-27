import Tabs from "@/components/Tabs";
import { memo, useEffect, useState } from "react";
import block_icon from "@/assets/images/web/block_icon.png";
import chain_icon from "@/assets/images/web/chain_icon.png";
import search_icon from "@/assets/images/web/search_icon.png";
import node_icon from "@/assets/images/web/node_icon.png";
import key_icon from "@/assets/images/web/key_icon.png";
import ServerApi from "@/api";
import { useHistory } from "react-router-dom";
import "../index.scss";
import moment from "moment";
import Pagination from "@/components/Pagination";
import KeyItem from "@/components/KeyItem";

export interface keysDataType {
  perm_name?: string;
  parent?: string;
  required_auth?:any;
  children?:any
}

const { getAccountByCreator } = ServerApi;
const ChainData = (props) => {
  const history = useHistory();
  let _data = [];
  for (let i = 0; i < 20; i++) {
    _data.push({
      name: "prospectorsg",
      dfs: "190,749.9181",
    });
  }
  const [chainDataList, setChainDataList] = useState(_data.slice(0, 12));
  const [activateData, setActivateData] = useState([]);
  const [keysData, setKeysData] = useState<keysDataType>({});
  const [activatelength, setActivatelength] = useState(0);
  const [isUnfold, setIsUnfold] = useState(false);

  const toggleMore = () => {
    if (!isUnfold) {
      setChainDataList(_data);
    } else {
      setChainDataList(_data.slice(0, 12));
    }
    setIsUnfold(!isUnfold);
  };
  const getAccountCreator = async (page) => {
    const res = await getAccountByCreator({
      creator: "amax",
      pageIndex: page,
      pageSize: 30,
    });
    setActivateData(res.data?.content);
    setActivatelength(res.data?.totalElements);
  };
  const toTree = (arr, perm_name)=> {
    function loop(perm_name) {
      return arr?.reduce((acc, cur) => {
        if (cur.parent === perm_name) {
          cur.children = loop(cur.perm_name)
          acc.push(cur)
        }
        return acc
      }, [])
    }
    return loop(perm_name)
  }
  useEffect(() => {
    console.log("useEffect");
    getAccountCreator(0);
    if (toTree(props.permissions,'')) {
      console.log(toTree(props.permissions,'')[0]);
      setKeysData(toTree(props.permissions,'')[0])
    }

  }, [props]);
  const chainTabList = [
    {
      label: "Tokens（19）",
      children: (
        <>
          <div className="p-t-16 fs-14">
            Total Tokens Value: $2.69 USD / 1.2117 EOS
          </div>
          <div className="chain-data-list">
            {chainDataList.map((item, i) => {
              return (
                <div
                  className={`chain-data-list-item${
                    i % 2 === 0 ? " dark" : ""
                  }`}
                  key={i}
                >
                  <img src={chain_icon} alt="" /> {item.name}
                  <p className="dfs number-font">
                    {item.dfs} <span className="orange">DFS</span>
                  </p>
                </div>
              );
            })}
          </div>
          <div
            className="toggle-button"
            onClick={() => {
              toggleMore();
            }}
          >
            {isUnfold ? "收起" : "展示全部"}
            <i className={`arrow-down${isUnfold ? " up" : ""}`}></i>
          </div>
        </>
      ),
    },
    {
      label: "Keys（4）",
      children: (
        <div className="keys-wrapper">
          <ul className="keys-tree">
            <li>
              <div className="keys-tree-item">
                <span className="title">{keysData.perm_name}</span>
                <div className="key-set">
                  {
                    keysData.required_auth?.keys?.map((el,idx)=>{
                      return (
                        <span className="ct" key={idx}>
                        ＋{el.weight}
                        <img className="key-icon" src={key_icon} alt="" />
                        <span className="c-50BF8C">
                          {el.key}
                        </span>
                      </span>
                      )
                    })
                  }
                </div>
              </div>
              {keysData.children && <KeyItem data={keysData.children} />}
            </li>
          </ul>
        </div>
      ),
    },
    {
      label: "NFTs（2）",
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
      label: `为他人激活（${activatelength}）`,
      children: (
        <div className="p-t-16 fs-14">
          <div className="activate-list flex-row-start-center">
            {activateData.map((item, i) => {
              return (
                <div
                  className="activate-list-item flex-col-between-center"
                  key={i}
                  onClick={() => {
                    history.push(`/producer-detail/${item?.name}`);
                  }}
                >
                  <div className="name flex-row-center-center">{item.name}</div>
                  <div className="detail-btn flex-row-center-center">
                    {moment(item.creation_date).local().format("YYYY/MM/DD")}{" "}
                    激活
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-row-end-center">
            <Pagination
              sizeOptions={[30]}
              total={activatelength}
              onChange={(currentPage) => {
                getAccountCreator(currentPage - 1);
              }}
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="section-box chain-data">
      <div className="chain-data-title">
        <img src={block_icon} alt="" /> Chain Data
      </div>
      <Tabs data={chainTabList} defaultActiveIndex={1} />
    </div>
  );
};

export default memo(ChainData);
