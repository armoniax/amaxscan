import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import trade_icon from "@/assets/images/web/trade_icon.png";
import operation_icon from "@/assets/images/web/operation_icon.png";
import full_icon from "@/assets/images/web/full_icon.png";
import check_icon from "@/assets/images/web/check_icon.png";
import network_icon from "@/assets/images/web/network_icon.png";
import forward_icon from "@/assets/images/web/forward_icon.png";
import copy from 'copy-to-clipboard';
import "./index.scss";
import { RouteComponentProps } from "react-router-dom";
import ServerApi from '@/api'
import { handleTime } from "@/utils";
import ReactJson from "react-json-view";
const { getTransactionData } = ServerApi

const TransactionDetail: FC<RouteComponentProps<{ hash: string }>> = (props): ReactElement => {
  const [activeIndex ,setActiveIndex] = useState<number>(0)
  const [showCopyTip,setShowCopyTip] = useState<boolean>(false)
  const [txnData,setTxnData] =  useState<any>({})
  const [jsonData,setJsonData] = useState<any>({})
  const {
    match: {
      params: { hash },
    },
  } = props;
  const copyText = (text)=>{
    text && copy(text)
    setShowCopyTip(true)
    setTimeout(() => {
      setShowCopyTip(false)
    }, 1000);
  }
  const tabList = [
    {
      name:'内含操作',
      icon:operation_icon
    },
    {
      name:'完整操作踪迹',
      icon:full_icon
    },
    {
      name:'查看原始数据',
      icon:check_icon
    },
  ]

  useEffect(()=>{
    const initData = async ()=>{
      const res  = await getTransactionData(hash)
      setTxnData(res)
      setJsonData(res.trx?.trx?.actions)
    }
    void initData()
  },[hash])
  return (
    <div className="transaction-detail">
      <div className="section-box">
        <div className="section-box-header">
          <p className="title flex-row-start-center"><img src={trade_icon} alt="" />交易信息</p>
        </div>
        <div className="flex-row-between-end">
          <div className="hash">
            <p className="m-b-4 fs-14">交易哈希</p>
            <div className="hash-bar flex-row-between-center">
              <div className="hash-value number-font">{hash}</div>
              <div className="btn flex-row-center-center" onClick={()=>{copyText(hash)}}>复制</div>
              <span className={`copy-tip${showCopyTip ? ' show':''}`}>复制成功</span>
            </div>
          </div>
          <div className="status">
            <p className="m-b-12 fs-14">状态</p>
            <div className="flex-row-between-center">
              <div className="status-btn">{txnData?.trx?.receipt?.status === 'executed' ? '已执行':'未执行'}</div>
              <div className="status-btn s-green">{txnData?.trx?.receipt?.status === 'executed' ? '不可逆':'可逆'}</div>
            </div>
          </div>
        </div>
        <div className="transaction-info">
          <div className="transaction-info-item flex-col-between-start">
            <p className="title">区块编号</p>
            <p className="number-font">{txnData.block_num}</p>
          </div>
          <div className="transaction-info-item flex-col-between-start">
            <p className="title">计算资源使用量</p>
            <p className="number-font">{txnData?.trx?.receipt?.cpu_usage_us} μs </p>
          </div>
          <div className="transaction-info-item flex-col-between-start">
            <p className="title">网络资源使用量</p>
            <p className="number-font">{txnData?.trx?.receipt?.net_usage_words} B</p>
          </div>
          <div className="transaction-info-item double">
            <div className="left flex-col-between-start">
              <p className="title">区块创建时间</p>
              <p className="number-font">{handleTime(txnData?.block_time) || '--'}</p>
            </div>
            <div className="right flex-col-between-start">
              <p className="title">交易过期时间</p>
              <p className="number-font">{handleTime(txnData?.trx?.trx?.expiration) || '--'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-box">
        <div className="transaction-tabs">
         {
          tabList.map((item,i)=>{
            return (
              <div key={i} className={`tab-item flex-row-center-center${activeIndex === i ?' active':''}`} onClick={()=>{setActiveIndex(i)}}>
                <img src={item.icon} alt="" />
                {item.name}
              </div>
            )
          })
         }
        </div>
        <div className="transaction-ct">
          {
            activeIndex === 0 && txnData.trx?.trx?.actions?.map((item,i)=>{
              return(
                <div className="flex-row-between-start" key={i}>
                  <div className="left">
                    <p className=" flex-row-start-center"> <img src={network_icon} alt="" /><span className="s-green">{item.account}:</span> {item.name}</p>
                    {
                      item.authorization.map((author,authorIndex)=>{
                        return(
                          <div className="active-block" key={authorIndex}>
                            <div className="blue flex-row-center-center">{author.actor}</div>
                            <div className="green flex-row-center-center">{author.permission}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="right">
                    <p> <span className="s-green">{item.account}</span> (智能合约) 处理了以下数据</p>
                    <div className="code-bar">
                     {
                      Object.keys(item.data).map((key,i)=>{
                        return <p key={i}>{`${key} : ${item.data[key]}`}</p>
                      })
                     }
                    </div>
                  </div>
                </div>
              )
            })
          }
          {
            activeIndex === 1 && <div className="flex-row-between-start">
            <div className="left flex-row-start-center">
              <p className="flex-row-start-center"><img src={forward_icon} alt="" /><span className="s-green">push.sx</span></p>
              <p className="m-l-90 flex-row-start-center"><img src={network_icon} alt="" /><span className="s-green">push.sx:</span>mine</p>
            </div>
            <div className="right">
              <p> <span className="s-green">push.sx</span> (智能合约) 处理了以下数据</p>
              <div className="code-bar">
                <p>count: 50</p>
                <p>nonce: 6404</p>
                <p>type: 3</p>
              </div>
            </div>
          </div>
          }
          {
            activeIndex === 2 && <div className="json-viewer-back">
              <ReactJson src={jsonData} name={false} indentWidth={10}  style={{fontFamily:'PingFang', fontSize:'14px',wordBreak:'break-all',lineHeight:'1.2'}} />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Baseweb(memo(TransactionDetail));
