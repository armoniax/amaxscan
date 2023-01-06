import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import node_icon from "@/assets/images/web/node_icon.png";
import trend_icon from "@/assets/images/web/trend_icon.png";
import "./index.scss";
import { RouteComponentProps } from "react-router-dom";
import ServerApi from "@/api";
import Pagination from "@/components/Pagination";
import { Spin } from "antd";
const { getCoinDetail,getAccountListByToken } = ServerApi

const TokenDetail: FC<RouteComponentProps<{ coin: string,code:string }>> = (
  props
): ReactElement => {
  const [coinData,setCoinData] = useState<any>({})
  const [accountList,setAccountList] = useState([])
  const [totalCount,setTotalCount] = useState(0)
  const [size,setSize] = useState(10)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [detailLoading,setDetailLoading] = useState(false)
  const {
    match: {
      params: { coin,code },
    },
  } = props;
  console.log(coin,code,'coincoincoin');

  const getAccountList = async (pageIndex,pageSize=10)=>{
      setLoading(true)
      const list = await getAccountListByToken({code,coin,pageIndex,pageSize})
      console.log(list?.data?.content,'datadatadata');
      setAccountList(list?.data?.content)
      setTotalCount(list?.data?.totalElements)
      setLoading(false)
  }

  useEffect(()=>{
    const initData = async() =>{
      setDetailLoading(true)
      const res = await getCoinDetail(code,coin)
      setCoinData(res?.data[0]);
      setDetailLoading(false)
      getAccountList(1)
    }
    void initData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[code,coin])

  return (
    <div className="token-detail">
      <Spin spinning={detailLoading}  tip="Loading...">
      <div className="section-box">
        <div className="flex-row-between-start">
          <div className="flex-row-center-stretch">
            <img className="token-logo" src={node_icon} alt="" />
            <div className="flex-col-between-start">
              <div>
                <p className="token-title">{coin}</p>
                <p className="c-50BF8C">{code}</p>
              </div>
              <div className="c-50BF8C">官网</div>
            </div>
          </div>
          <div className="token-number flex-row-start-center">
            <span className="fs-20 number-font">
              0.00 <span className="fs-14">USD</span>
            </span>
            <div className="token-trend">＋0.00%</div>
          </div>
        </div>
        <div className="number-list">
          <div className="number-list-item">
            <div>持有者地址数量</div>
            <div className="number-font">{coinData.totaluser}</div>
          </div>
          <div className="number-list-item">
            <div>已发行供应量</div>
            <div className="number-font">{coinData.total} {coin}</div>
          </div>
          <div className="number-list-item">
            <div>日交易量</div>
            <div className="number-font">
              <p>0 USD</p>
              <p>0 AMAX</p>
            </div>
          </div>
          <div className="number-list-item">
            <div>最大供应量</div>
            <div className="number-font">{coinData.total} {coin}</div>
          </div>
        </div>
      </div>
      </Spin>
      <div className="rank-table section-box">
        <div className="section-box-header">
          <p className="title">
            <img src={trend_icon} alt="" /> 持有者地址排名
          </p>
        </div>
        <Spin spinning={loading}  tip="Loading...">
        <table className="common-table">
          <tbody>
            <tr className="table-header text-align-between">
              <td>排名</td>
              <td>账户名</td>
              <td>{coin}数量</td>
            </tr>
            {accountList.map((item, i) => {
              return (
                <tr className="text-align-between">
                  <td>{i+1+size*(page-1)}</td>
                  <td className="c-50BF8C">{item.code}</td>
                  <td className="number-font">{item.balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {totalCount !== 0 && <div className="flex-row-end-center">
            <Pagination
              sizeOptions={[10,20,30]}
              total={totalCount}
              onSizeChange={(page,size)=>{
                setPage(page)
                setSize(size)
                getAccountList(1,size);
              }}
              onChange={(page,size) => {
                setPage(page)
                setSize(size)
                getAccountList(page,size);
              }}
            />
        </div>}
        </Spin>

      </div>
    </div>
  );
};

export default Baseweb(memo(TokenDetail));
