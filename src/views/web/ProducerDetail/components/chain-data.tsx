import Tabs from "@/components/Tabs";
import { memo, useEffect, useState } from "react";
import block_icon from "@/assets/images/web/block_icon.png";
import chain_icon from "@/assets/images/web/chain_icon.png";
import search_icon from "@/assets/images/web/search_icon.png";
import key_icon from "@/assets/images/web/key_icon.png";
import ServerApi from "@/api";
import { Link, useHistory } from "react-router-dom";
import "../index.scss";
import moment from "moment";
import Pagination from "@/components/Pagination";
import KeyItem from "@/components/KeyItem";
import NoData from "@/components/NoData";
import axiosRequest from "@/api/axiosRequest";

export interface keysDataType {
  perm_name?: string;
  parent?: string;
  required_auth?:any;
  children?:any
}

const { getAccountByCreator,getNFTByScope,getTokenByScope } = ServerApi;
const ChainData = (props) => {
  console.log(props,'propspropspropsprops');

  const history = useHistory();
  let _data = [];
  const [tokenList, setTokenList] = useState([]);
  const [activateData, setActivateData] = useState([]);
  const [NFTData, setNFTData] = useState([]);
  const [keysData, setKeysData] = useState<keysDataType>({});
  const [activatelength, setActivatelength] = useState(0);
  const [isUnfold, setIsUnfold] = useState(false);
  const [currentPage,setCurrentPage] = useState(1)

  const toggleMore = () => {
    if (!isUnfold) {
      setTokenList(_data);
    } else {
      setTokenList(_data.slice(0, 12));
    }
    setIsUnfold(!isUnfold);
  };

  const changePage = (type:string)=>{
    switch (type) {
      case 'prev':
        if (currentPage > 1) {
          setCurrentPage(currentPage-1)
        }
        break;
      case 'next':
        setCurrentPage(currentPage+1)
        break;
      default:
        break;
    }
  }

  const getAccountCreator = async (page) => {
    const res = await getAccountByCreator({
      creator: props.account,
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

  useEffect(()=>{
    getAccountCreator(0);
    const getTokenList = async () => {
      const res = await getTokenByScope(props?.account);
      setTokenList(res?.data)
    };
    getTokenList()
  },[props])
  useEffect(() => {
    console.log("useEffect");

    if (toTree(props.permissions,'')) {
      console.log(toTree(props.permissions,'')[0]);
      setKeysData(toTree(props.permissions,'')[0])
    }

    const getNFT = async () => {
      const _data = []
      const res = await getNFTByScope('testuser1',currentPage - 1)
      for (let i = 0; i < res.data.length; i++) {
        const data = await axiosRequest.get(res.data[i].token_uri)
        _data.push({balance_nsymbol_id: res.data[i].balance_nsymbol_id,max_supply_amount:res.data[i].max_supply_amount,...data})
      }
      console.log(res,'getNFT');
      setNFTData(_data)
    };

    getNFT()
  }, [props,currentPage]);
  const chainTabList = [
    {
      label: `Tokens（${tokenList.length}）`,
      children: (
        <>
          <div className="chain-data-list">
            {tokenList.map((item, i) => {
              return (
                <div
                  className={`chain-data-list-item${
                    i % 2 === 0 ? " dark" : ""
                  }`}
                  key={i}
                >
                  <img src={chain_icon} alt="" /> {item.code}
                  <p className="dfs">
                    <span className="number-font" title={item.balance}>{item.balance}</span> <span className="orange">{item.coin}</span>
                  </p>
                </div>
              );
            })}
          </div>
          {
            tokenList.length > 12 && <div
            className="toggle-button"
            onClick={() => {
              toggleMore();
            }}
          >
            {isUnfold ? "收起" : "展示全部"}
            <i className={`arrow-down${isUnfold ? " up" : ""}`}></i>
          </div>
          }
        </>
      ),
    },
    {
      label: `Keys（${props.permissions?.length || 0}）`,
      children: (
        <div className="keys-wrapper">
          {!props.permissions?.length && <NoData />}
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
                        <Link to={{pathname: `/publicKey-list/${el.key}`,}} className="c-50BF8C" >
                          {el.key}
                        </Link>
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
      label: `NFTs（${NFTData?.length || 0}）`,
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
              {
                NFTData?.map((item,index)=>{
                  return (
                    <tr key={index} onClick={()=>{
                      history.push(`/nft-item/${props.account}/${item?.balance_nsymbol_id}`);
                    }}>
                      <td>
                        <img className="logo" src={item.cover_url} alt="" />
                      </td>
                      <td>{item.name}</td>
                      <td className="s-green">{item.token_id}</td>
                      <td>{''}</td>
                      <td>{item.issuer}</td>
                      <td>#{item.balance_nsymbol_id}/{item.max_supply_amount}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          {!NFTData.length && <NoData />}
          <div className="flex-row-end-center">
              <div className="btn-wrapper">
                <div className="btn" onClick={()=>{changePage('prev')}}>prev</div>
                <div className="btn">{currentPage}</div>
                <div className="btn" onClick={()=>{changePage('next')}}>next</div>
              </div>
          </div>
        </div>
      ),
    },
    {
      label: `为他人激活（${activatelength}）`,
      children: (
        <div className="p-t-16 fs-14">
          {!activatelength && <NoData />}
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
          {activatelength !== 0 && <div className="flex-row-end-center">
            <Pagination
              sizeOptions={[30]}
              total={activatelength}
              onChange={(currentPage) => {
                getAccountCreator(currentPage - 1);
              }}
            />
          </div>}
        </div>
      ),
    },
  ];
  return (
    <div className="section-box chain-data">
      <div className="chain-data-title">
        <img src={block_icon} alt="" /> Chain Data
      </div>
      <Tabs data={chainTabList} defaultActiveIndex={0} />
    </div>
  );
};

export default memo(ChainData);
