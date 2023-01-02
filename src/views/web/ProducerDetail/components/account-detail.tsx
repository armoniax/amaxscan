import Tabs from "@/components/Tabs";
import {  memo, useEffect, useState } from "react";
import "../index.scss";
import ServerApi from '@/api'
import ReactJson from "react-json-view";


const {getCode,getTableRows} = ServerApi

const AccountDetail = (props) => {
  const [active, setActive] = useState('tables');
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [abiJson, setAbiJson] = useState({});
  const [currentTableName, setCurrentTableName] = useState('');
  const [tableJson, setTableJson] = useState({});
  const [tablesData, setTablesData] = useState([]);

  const cpuUsed:string = (props?.data?.cpu_limit?.used/1000).toFixed(2)
  const cpuTotal:string = (props?.data?.cpu_limit?.max/1000).toFixed(2)
  const cpuProcessWidth:number =  (props?.data?.cpu_limit?.used / props?.data?.cpu_limit?.max) * 100

  const ramUsed:string = (props.data?.ram_usage / 1024).toFixed(2)
  const ramTotal:string = (props.data?.ram_quota / 1024).toFixed(2)
  const ramProcessWidth:number =  (props?.data?.ram_usage / props?.data?.ram_quota) * 100 < 0 ? 0 : (props?.data?.ram_usage / props?.data?.ram_quota) * 100

  const netUsed:string = (props?.data?.net_limit?.used / 1024).toFixed(2)
  const netTotal:string = (props?.data?.net_limit?.max / 1024).toFixed(2)
  const netProcessWidth:number = (props?.data?.net_limit?.used / props?.data?.net_limit?.max) * 100


  useEffect(()=>{

    const getAbiData = async ()=>{
      const res = await getCode(props?.data?.account_name)
      setAbiJson(res?.abi)
      setTablesData(res?.abi?.tables || [])
      setCurrentTableName(res?.abi?.tables[0].name)
    }

    void getAbiData()
  },[props])

  useEffect(()=>{
    const getTableJson = async ()=>{
      const res = await getTableRows(props?.data.account_name,currentTableName)
      setTableJson(res)
    }
    void getTableJson()
  },[props,activeTableIndex,currentTableName])

  const tablesComponent = (
    <div>
      <p className="m-t-20 m-b-20 c-303333">选择数据表名</p>
      <div className="smart-contract-tabs flex-row-start-center">
        {
          tablesData?.map((item,index)=>{
            return (
              <div className={`smart-contract-tabs-item${activeTableIndex === index ? ' active':''}`} key={index}  onClick={()=>{
                setActiveTableIndex(index)
                setCurrentTableName(tablesData[index].name)
              }}>{item.name}</div>
            )
          })
        }
      </div>
      {/* <div className="condition-query">
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
          {[1, 2, 3, 4, 5].map((item, i) => {
            return (
              <tr key={i}>
                <td>1</td>
                <td>21</td>
                <td>
                  424setsession4242transactioFSA8fasfisolation98level12re
                </td>
                <td>
                  p2wewsetsession4242transactioFSA8fasfisolation98
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <div className="abi-panel">
        <ReactJson src={tableJson} name={false} collapsed={1} indentWidth={10}  style={{fontFamily:'PingFang', fontSize:'14px',wordBreak:'break-all',lineHeight:'1.2'}} />
      </div>
    </div>
  )
  const ABIComponent = (
    <div className="abi-panel">
      <ReactJson src={abiJson} name={false} collapsed={1}  indentWidth={10}  style={{fontFamily:'PingFang', fontSize:'14px',wordBreak:'break-all',lineHeight:'1.2'}} />
    </div>
  )
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
                  <span className="number number-font">{props.balance}</span> AMAX
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
          </div>
          <div className="right">
            <div className="process-list">
              <div className="process-list-item flex-row-between-center">
                <div>
                  <div className="title number-font">RAM</div>
                  <div className="desc">已用{ramUsed} KB/共{ramTotal} KB</div>
                </div>
                <div className="process-wrapper">
                  <div className={`process ${ramProcessWidth.toFixed(2) === '100.00' ? 'full': ''}`} style={{ width: (ramProcessWidth < 1 ? 1 : ramProcessWidth) + '%'}}>
                  </div>
                </div>
                <span className="percent">{ramProcessWidth.toFixed(2)}%</span>
              </div>
              <div className="process-list-item flex-row-between-center">
                <div>
                  <div className="title number-font">CPU</div>
                  <div className="desc">已用{cpuUsed} µs/共{cpuTotal} µs</div>
                </div>
                <div className="process-wrapper">
                  <div className={`process ${cpuProcessWidth.toFixed(2) === '100.00' ? 'full': ''}`} style={{ width: (cpuProcessWidth < 1 ? 1 : cpuProcessWidth) + "%" }}>
                  </div>
                </div>
                <span className="percent">{cpuProcessWidth.toFixed(2)}%</span>
              </div>
              <div className="process-list-item flex-row-between-center">
                <div>
                  <div className="title number-font">NET</div>
                  <div className="desc">已用{netUsed}KB/共{netTotal}KB</div>
                </div>
                <div className="process-wrapper">
                  <div className={`process ${netProcessWidth.toFixed(2) === '100.00' ? 'full': ''}`} style={{ width: (netProcessWidth < 1 ? 1 : netProcessWidth) + "%" }}>
                  </div>
                </div>
                <span className="percent">{netProcessWidth.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "智能合约",
      children: (
        <div className="smart-contract">
          <div className="smart-contract-tabs flex-row-start-center">
            <div className={`smart-contract-tabs-item${active==='tables'?' active':''}`} onClick={()=>{setActive('tables')}}>Tables</div>
            <div className={`smart-contract-tabs-item${active==='ABI'?' active':''}`}  onClick={()=>{setActive('ABI')}}>ABI</div>
          </div>
          {
            active==='tables' ? tablesComponent : ABIComponent
          }
        </div>
      ),
    },
  ];
  return (
    <div className="section-box tabs">
      <Tabs data={accountTabList} defaultActiveIndex={0} />
    </div>
  );
};

export default memo(AccountDetail);
