import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";
import blockchain_icon from "@/assets/images/web/blockchain_icon.png";
import message_icon from "@/assets/images/web/message_icon.png";
import Tabs from "@/components/Tabs";
import { RouteComponentProps, useHistory } from "react-router";
import ServerApi from '@/api'
import ReactJson from 'react-json-view'
import { handleTime } from "@/utils";

const {getBlockDetail} = ServerApi
const BlockDetail: FC<RouteComponentProps<{ block_num: string }>> = (props): ReactElement => {
  const history = useHistory()
  const [detailData,setDetailData] = useState<any>({})
  const [jsonData,setJsonData] = useState<any>({})
  const {
    match: {
      params: { block_num },
    },
  } = props;
  useEffect(() => {
    const initData = async() => {
      const res = await getBlockDetail(block_num)
      setJsonData(JSON.parse(JSON.stringify(res)))
      const _data = res
      if (res.transactions && res.transactions.length) {
        _data.trxArr = createTransactionsArray(res.transactions);

       if(_data.trxArr.length > 1){
         const cpuUsage = _data.trxArr.reduce((pre,cur)=>{
          return pre.cpu+cur.cpu
        })
        const netUsage = _data.trxArr.reduce((pre,cur)=>{
          return pre.net+cur.net
        })
        const actionsTotal = _data.trxArr.reduce((pre,cur)=>{
          return pre.actions.length+cur.actions.length
        })
        _data.cpuUsage = cpuUsage
        _data.netUsage = netUsage
        _data.actionsTotal = actionsTotal
       }else{
        _data.cpuUsage = _data.trxArr[0].cpu
        _data.netUsage = _data.trxArr[0].net
        _data.actionsTotal = _data.trxArr[0].actions.length
       }
      }

      setDetailData(_data)
    };

    const createTransactionsArray = (data) => {
      let result = [];

      data.forEach((elem) => {
        if (typeof elem.trx === "string") {
          return;
        }
        result.push({
          cpu: elem.cpu_usage_us,
          net: elem.net_usage_words,
          status: elem.status,
          hash: elem.trx.id,
          actions: elem.trx.transaction.actions,
          expiration: elem.trx.transaction.expiration
        });
      });

      return result;
    };
    void initData()
  }, [block_num]);

  const tabList = [
    {
      label: "Transactions",
      key: 1,
      children: (
        <div className="transaction-table">
          <table className="common-table">
            <tbody>
              <tr className="table-header text-align-between">
                <td>ID</td>
                <td>过期</td>
                <td>CPU使用</td>
                <td>NET使用</td>
                <td>操作数量</td>
              </tr>
              {
                detailData?.trxArr?.map((item,i)=>{
                  return(
                    <tr className="text-align-between" key={item.hash}>
                      <td width={300}>
                          <span className="main-color pointer" onClick={()=>{
                            history.push(`/transaction-detail/${item?.hash}`)
                          }}>{item?.hash}</span>
                      </td>
                      <td>{handleTime(item?.expiration)}</td>
                      <td>
                        <div className="green-tag">{item?.cpu} μs</div>
                      </td>
                      <td>
                        <div className="green-tag">{item?.net} Bytes</div>
                      </td>
                      <td>{item?.actions?.length}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      ),
    },
    {
      label: "Raw",
      key: 2,
      children: (
        <div className="json-viewer-back m-t-10">
          <ReactJson src={jsonData} indentWidth={10} collapsed={1} style={{fontFamily:'PingFang', fontSize:'14px',wordBreak:'break-all',lineHeight:'1.2'}} />
        </div>
      ),
    },
  ];
  return (
    <div className="block-detail">
      <div className="box-title flex-row-start-center">
        <img src={blockchain_icon} alt="" />
        区块#{block_num}
      </div>
      <div className="flex-row-between-stretch">
        <div className="section-box half">
          <div className="header row flex-row-start-center">
            <div className="title">概要：</div>
            <div className="ct main-color">{+block_num < +sessionStorage.getItem('irreversible_num') ? '不可逆的' : '可逆的'}</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">区块高度:</div>
            <div className="ct flex-row-between-center">
              <span>{detailData?.block_num}</span>
              <div className="prenext-btns flex-row-start-center">
                <div className="btn left flex-row-between-center" onClick={()=>{
                  history.push(`/block-detail/${Number(block_num) - 1}`)
                }}>
                  <i className="arrow-icon left"></i>上一个
                </div>
                <div className="btn right flex-row-between-center" onClick={()=>{
                  history.push(`/block-detail/${Number(block_num) + 1}`)
                }}>
                  下一个<i className="arrow-icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">时间戳:</div>
            <div className="ct">{handleTime(detailData?.timestamp)}</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">出块节点名:</div>
            <div className="ct text-yellow pointer" onClick={()=>{
              history.push(`/producer-detail/${detailData?.producer}`)
            }}>{detailData?.producer}</div>
          </div>
          <div className="row flex-row-start-start">
            <div className="title">区块ID:</div>
            <div className="ct">
              {detailData?.id}
            </div>
          </div>
        </div>
        <div className="section-box half right">
          <div className="row header">
            <div className="title">额外信息</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">资源使用 -CPU/NET:</div>
            <div className="ct">{detailData?.cpuUsage || 0} μs / {detailData?.netUsage || 0} bytes</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">TX交易哈希数量：</div>
            <div className="ct text-yellow">{detailData?.trxArr?.length || 0}</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">Action数量：</div>
            <div className="ct text-red">{detailData?.actionsTotal || 0}</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">上一个区块：</div>
            <div className="ct main-color">{Number(block_num)-1}</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">下一个区块：</div>
            <div className="ct main-color">{Number(block_num)+1}</div>
          </div>
        </div>
      </div>
      <div className="box-title flex-row-start-center">
        <img src={message_icon} alt="" />
        区块信息
      </div>
      <div className="section-box">
        <div className="tabs">
          <Tabs
            data={tabList}
            defaultActiveIndex={0}
            onChange={(data) => {
              console.log(data, "data");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Baseweb(memo(BlockDetail));
