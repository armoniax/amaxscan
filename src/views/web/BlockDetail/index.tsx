import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";
import blockchain_icon from "@/assets/images/web/blockchain_icon.png";
import message_icon from "@/assets/images/web/message_icon.png";
import Tabs from "@/components/Tabs";
import { RouteComponentProps } from "react-router";
import ServerApi from '@/api'
import moment from "moment";
const {getBlockDetail} = ServerApi
const BlockDetail: FC<RouteComponentProps<{ block_num: string }>> = (props): ReactElement => {
  const [detailData,setDetailData] = useState<any>({})
  const formatTime = (t?: any) => {
    return moment(t).local().format('YYYY-MMM-DD,  HH:mm:ss');
};
  const {
    match: {
      params: { block_num },
    },
  } = props;
  useEffect(() => {
    console.log(21);

    const initData = async() => {
      console.log(77);

      const res = await getBlockDetail(block_num)
      const _data = res
      if (res.transactions && res.transactions.length) {
        _data.trxArr = createTransactionsArray(res.transactions);
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
          expiration: elem.trx.transaction.expiration,
        });
      });
      console.log(result);

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
                detailData?.trxArr?.map(item=>{
                  return(
                    <tr className="text-align-between">
                      <td width={300}>
                        e4d235c119240fa56241394e39aff0c7522f0269706d9ce4b
                      </td>
                      <td>{formatTime(item.expiration)}</td>
                      <td>
                        <div className="green-tag">272 μs</div>
                      </td>
                      <td>
                        <div className="green-tag">120 Bytes</div>
                      </td>
                      <td>4</td>
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
      children: `<div>2</div>`,
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
            <div className="ct main-color">不可逆的</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">区块高度:</div>
            <div className="ct flex-row-between-center">
              <span>127,173,641</span>
              <div className="prenext-btns flex-row-start-center">
                <div className="btn left flex-row-between-center">
                  <i className="arrow-icon left"></i>上一个
                </div>
                <div className="btn right flex-row-between-center">
                  下一个<i className="arrow-icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">时间戳:</div>
            <div className="ct">{formatTime(detailData.time)}</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">出块节点名:</div>
            <div className="ct text-yellow">eosrio</div>
          </div>
          <div className="row flex-row-start-start">
            <div className="title">区块ID:</div>
            <div className="ct">
              0794840912729fa095d5876d6563f099bc985d98a26de663a90ed78ebeed0597
            </div>
          </div>
        </div>
        <div className="section-box half right">
          <div className="row header">
            <div className="title">额外信息</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">资源使用 -CPU/NET:</div>
            <div className="ct">1,980 μs / 982 bytes</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">TX交易哈希数量：</div>
            <div className="ct text-yellow">4</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">Action数量：</div>
            <div className="ct text-red">5</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">上一个区块：</div>
            <div className="ct main-color">127,173,640</div>
          </div>
          <div className="row flex-row-start-center">
            <div className="title">下一个区块：</div>
            <div className="ct main-color">127,173,640</div>
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
