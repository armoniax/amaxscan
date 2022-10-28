import { FC, memo, ReactElement, useState } from "react";
import deal_icon from "@/assets/images/web/deal_icon.png";
import forward_icon from "@/assets/images/web/forward_icon.png";
import { DatePicker, Select } from "antd";
import Pagination from '@/components/Pagination'
import moment from "moment";
import "../index.scss";
const { RangePicker } = DatePicker;
const { Option } = Select;

const actionArr = [
  {
    name:'发送代币',
    active:false
  },
  {
    name:'接收代币',
    active:false
  },
  {
    name:'抵押和买卖资源',
    active:false
  },
  {
    name:'投票和节点相关',
    active:false
  },
  {
    name:'智能合约',
    active:false
  },
  {
    name:'多重签名',
    active:false
  },
  {
    name:'账号相关',
    active:false
  },
  {
    name:'其他',
    active:false
  },
]

const Transactions: FC = (): ReactElement => {
  const [actionList,setActionList] = useState(actionArr)
  const setAction = (curIndex) =>{
    const _list = actionList.map((item,i) => {
      if (i === curIndex) {
        item.active  = !item.active
      }
      return item
    })
    setActionList(_list)
  }
  return (
    <div className="section-box transactions">
      <div className="transactions-header">
        <img src={deal_icon} alt="" /> Transactions
      </div>
      <ul className="filters flex-row-start-center">
        <li className="filters-item disabled">Actions过滤</li>
        {
          actionList.map((item,i)=>{
            return (
              <li className={`filters-item${item.active ? ' active' :''}`} key={i} onClick={()=>{setAction(i)}}>{item.name}</li>
            )
          })
        }
      </ul>
      <div className="serach-filters flex-row-start-center">
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
      </div>
      <table className="transactions-table common-table">
        <tbody>
        <tr className="table-header">
          <td>TX</td>
          <td>日期</td>
          <td>Action</td>
          <td>数据</td>
        </tr>
        <tr>
          <td>b424…5840</td>
          <td>Apr 28, 2022 12:05:10 PM</td>
          <td>
            <span className="type square">eosio - onblockeosio</span>
          </td>
          <td>
          <div className="data-1">
              <p>account: <span className="s-green">sz441siulzhq</span></p>
              <p>permission: <span className="s-red">46</span> </p>
            </div>
          </td>
        </tr>
        <tr>
          <td>b424…5840</td>
          <td>Apr 28, 2022 12:05:10 PM</td>
          <td>
            <span className="type round">发送代币</span>
          </td>
          <td>
          <div className="data-2">
              <span className="s-green">sz441siulzhper</span>
              <img src={forward_icon} alt="" />
              <span className="s-green">permission</span>
              <div className="type square">0.1058 DCASH</div>
              <span>issue cash for LP mining.</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>b424…5840</td>
          <td>Apr 28, 2022 12:05:10 PM</td>
          <td>
            <span className="type square">eosio - onblockeosio</span>
          </td>
          <td>
            <div className="data-2">
              <span className="s-green">sz441siulzhper</span>
              <img src={forward_icon} alt="" />
              <span className="s-green">permission</span>
              <div className="type square">0.1058 DCASH</div>
              <span>issue cash for LP mining.</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>b424…5840</td>
          <td>Apr 28, 2022 12:05:10 PM</td>
          <td>
          <span className="type round">发送代币</span>
          </td>
          <td>
          <div className="data-1">
              <p>account: <span className="s-green">sz441siulzhq</span></p>
              <p>permission: <span className="s-red">46</span> </p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div className="flex-row-end-center">
        <Pagination total={400}  />
      </div>
    </div>
  );
};

export default memo(Transactions);
