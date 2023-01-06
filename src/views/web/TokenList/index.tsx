import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import search_icon from "@/assets/images/web/search_icon.png";
import "./index.scss";
import ServerApi from "@/api";
import {  useHistory } from "react-router-dom";
import NoData from "@/components/NoData";
const { getTokenList } = ServerApi
const TokenList: FC = (): ReactElement => {
  const history = useHistory();
  const pageSize = 10
  const [tokenList,setTokenList] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [serachWord,setSearchWord] = useState('')



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
  useEffect(()=>{
    const initData = async()=>{
      const res = await getTokenList({pageNum:currentPage - 1,pageSize,search:serachWord})
      setTokenList(res?.data)
    }
    void initData()
  },[currentPage,serachWord])
  return (
    <div>
      <div className="token-list section-box">
        <div className="token-list-search flex-row-start-center">
          <img src={search_icon} alt="" />
          <input type="text" placeholder="搜索代币的名称或者合约" onInput={(e: any) => {
            setSearchWord(e.target.value)
          }} />
        </div>
        <table className="common-table">
          <tbody>
            <tr className="table-header text-align-between">
              <td>名称</td>
              <td>合约地址</td>
              <td>已发行供应量</td>
            </tr>
            {tokenList.map((item, i) => {
              return (
                <tr className="text-align-between" key={i}>
                  <td className="pointer" onClick={()=>{
                    history.push(`/token-detail/${item.coin}/${item.code}`);
                  }}>{item.coin}</td>
                  <td className="c-50BF8C pointer" onClick={()=>{
                    history.push(`/producer-detail/${item.code}`);
                  }}>{item.code}</td>
                  <td className="number-font">{item.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!tokenList.length && <NoData />}
        {
          (tokenList.length > pageSize || currentPage !== 1) &&
          <div className="flex-row-end-center">
            <div className="btn-wrapper">
              <div className="btn" onClick={()=>{changePage('prev')}}>prev</div>
              <div className="btn">{currentPage}</div>
              <div className="btn" onClick={()=>{changePage('next')}}>next</div>
            </div>
        </div>
        }
      </div>
    </div>
  );
};

export default Baseweb(memo(TokenList));
