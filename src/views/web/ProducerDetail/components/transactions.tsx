import {  memo, useEffect, useState } from "react";
import deal_icon from "@/assets/images/web/deal_icon.png";
// import forward_icon from "@/assets/images/web/forward_icon.png";
// import { DatePicker, Select } from "antd";
// import Pagination from '@/components/Pagination'
// import moment from "moment";
import "../index.scss";
import ServerApi from '@/api'
import { handleTime } from "@/utils";
import { Link } from "react-router-dom";
import NoData from "@/components/NoData";
import { Spin } from "antd";
const {getActionsByAccount} = ServerApi
// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const actionArr = [
//   {
//     name:'发送代币',
//     active:false
//   },
//   {
//     name:'接收代币',
//     active:false
//   },
//   {
//     name:'抵押和买卖资源',
//     active:false
//   },
//   {
//     name:'投票和节点相关',
//     active:false
//   },
//   {
//     name:'智能合约',
//     active:false
//   },
//   {
//     name:'多重签名',
//     active:false
//   },
//   {
//     name:'账号相关',
//     active:false
//   },
//   {
//     name:'其他',
//     active:false
//   },
// ]

const Transactions= (props) => {
  // const [actionList,setActionList] = useState(actionArr)
  const [trxList,setTrxList] = useState([])
  const [loading,setLoading] = useState(false)
  const [position,setPosition] = useState(-1)
  const [currentPage,setCurrentPage] = useState(1)

  // 中间省略号
  const ellipsisTextInMiddle = (text) =>{
    return `${text.slice(0,4)}...${text.slice(-4,text.length)}`
  }


  const changePage = (type:string)=>{
    switch (type) {
      case 'prev':
        if (currentPage > 1) {
          setPosition(trxList[0].account_action_seq + 1)
          setCurrentPage(currentPage-1)
        }
        break;
      case 'next':
        setPosition(trxList[trxList.length - 1].account_action_seq -1)
        setCurrentPage(currentPage+1)
        break;
      default:
        break;
    }
  }

  useEffect(()=>{
    const getActions = async ()=>{
      setLoading(true)
      const res = await getActionsByAccount(props.account, position, 15)
      console.log('getActions-----', res.actions);
      setTrxList(res.actions.reverse())
      setLoading(false)
    }
    getActions()
  },[props,position])
  return (
    <div className="section-box transactions">
      <div className="transactions-header">
        <img src={deal_icon} alt="" /> Transactions
      </div>
      {/* <ul className="filters flex-row-start-center">
        <li className="filters-item disabled">Actions过滤</li>
        {
          actionList.map((item,i)=>{
            return (
              <li className={`filters-item${item.active ? ' active' :''}`} key={i} onClick={()=>{setAction(i)}}>{item.name}</li>
            )
          })
        }
      </ul> */}
      {/* <div className="serach-filters flex-row-start-center">
        <div className="serach-filters-item">
        <span className="name">日期</span>&nbsp;&nbsp;
          <RangePicker
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [
                moment("00:00:00", "HH:mm:ss"),
                moment("11:59:59", "HH:mm:ss"),
              ],
            }}
            format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
        <div className="serach-filters-item">
          <span className="name">代币过滤</span>&nbsp;&nbsp;
          <Select
            allowClear
            showSearch
            placeholder="All tokens"
            optionFilterProp="children"
            style={{ width: 156 }}
            filterOption={(input, option) =>
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            <Option value="jack">a</Option>
            <Option value="lucy">b</Option>
            <Option value="tom">c</Option>
          </Select>
        </div>
        <div className="serach-filters-btn">搜索</div>
      </div> */}
      <Spin spinning={loading}  tip="Loading...">
        <table className="transactions-table common-table">
          <tbody>
          <tr className="table-header">
            <td>TX</td>
            <td>日期</td>
            <td>Action</td>
            <td>数据</td>
          </tr>
          {
            trxList?.map((item,index)=>{
              return (
                <tr key={index}>
                  <td width={100}><Link to={{pathname: `/transaction-detail/${item.action_trace?.trx_id}`}} className="s-green" title={item.action_trace?.trx_id}>{ellipsisTextInMiddle(item.action_trace?.trx_id)}</Link></td>
                  <td width={200}>{handleTime(item.block_time)}</td>
                  <td>
                    <span className="type square">{ item?.action_trace?.act?.account } - { item?.action_trace?.act?.name }</span>
                  </td>
                  <td>
                  <div className="data-1">
                      <span className="s-green">{ item?.action_trace?.act?.data?.from }</span>
                      <span className="ml-2 mr-2">{item?.action_trace?.act?.data?.to && '→'} </span>
                      <span className="s-green">{ item?.action_trace?.act?.data?.to }</span>
                      <span className="ml-2">{ item?.action_trace?.act?.data?.quantity }</span>
                    </div>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        {!trxList.length && <NoData />}
        <div className="flex-row-end-center">
            <div className="btn-wrapper">
              <div className="btn" onClick={()=>{changePage('prev')}}>prev</div>
              <div className="btn">{currentPage}</div>
              <div className="btn" onClick={()=>{changePage('next')}}>next</div>
            </div>
        </div>
      </Spin>
    </div>
  );
};

export default memo(Transactions);
