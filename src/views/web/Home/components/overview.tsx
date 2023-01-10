import { FC, memo, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import curBlockPng from "@/assets/images/web/cur_block.png";
import latestBlockPng from "@/assets/images/web/latest_block.png";
import nodesPng from "@/assets/images/web/nodes.png";
import statusPng from "@/assets/images/web/status.png";
import fresh_sign from "@/assets/images/web/fresh_sign.png";
import forward from "@/assets/images/web/forward.png";
import header_logo from "@/assets/images/web/header_logo.png";
import amax_banner from "@/assets/images/web/amax_banner.png";
import ServerApi from "@/api";
import "../index.scss";
import { Spin } from "antd";
import socket from "@/api/socket";
const { getOverview,getTotalSupply,getTotalPledge,getTableRows } = ServerApi;

interface overviewDataType {
  head_num:string,
  total_trxs:number,
  total_actions:number,
  irreversible_num:number,
  max_blocktxns_count:number,
  max_blockactions_count:number
}


const OverView: FC = (): ReactElement => {
  const { t } = useTranslation();
  const [loading,setLoading] = useState(false)
  const [curProducer, setCurProducer] = useState('');
  const [ramGlobal, setRamGlobal] = useState<any>({});
  const [nextProducer, setNextProducer] = useState('');
  const [totalSupply,setTotalSupply] = useState('0')
  const [totalPledge,setTotalPledge] = useState('0')
  const [ramPrice,setRamPrice] = useState('0')
  const [overViewData,setOverViewData] = useState<overviewDataType | any>({})
  useEffect(() => {
    const countRamPrice = (res) => {
      if (!res || !res.rows || !res.rows[0] || !res.rows[0].quote || !res.rows[0].base) {
          return console.error('data error', res);
      }
      let data = res.rows[0];
      let quoteBalance = Number(data.quote.balance.split(' ')[0]);
      let baseBalance = Number(data.base.balance.split(' ')[0]);
      setRamPrice(((quoteBalance / baseBalance) * 1024).toFixed(5))
  };
    const initData = async () => {
      setLoading(true)
      const res = await getOverview();
      const supply = await getTotalSupply()
      const pledge = await getTotalPledge()
      const ramPriceData = await getTableRows('amax', 'rammarket', 10)
      const ramGlobalData = await getTableRows('amax', 'global', 10)
      setRamGlobal(ramGlobalData?.rows[0])
      countRamPrice(ramPriceData)
      setTotalSupply(`${supply?.rows[0]?.max_supply}`.split(' ')[0])
      setTotalPledge(pledge?.data[0]?.sum)

      setOverViewData(res.data[0])
      sessionStorage.setItem('irreversible_num',res?.data[0]?.irreversible_num)
      setLoading(false)
    };
    void initData();
  }, []);

  useEffect(() => {
    const initData = async () => {
      socket.on('get_tps_blocks', (res: any) => {
        setCurProducer(res[0].producer)
      });
    }
    void initData();
    return () => {
      socket.close();
      socket.disconnect();
    };
  }, []);

  useEffect(()=>{
    socket.on("producers", (data: any) => {
      let nextProducer = ''
      const _data = data.rows.slice(0,21)
      _data.forEach((item,index)=> {
        if (item.owner === curProducer) {
          if (index + 1 === _data.length) {
            nextProducer = _data[0].owner
          }else{
            nextProducer = _data[index + 1].owner
          }

        }
      })
      setNextProducer(nextProducer)

    })
  },[curProducer])
  return (
    <Spin spinning={loading}  tip="Loading...">
    <div className="m-situation-blocks">
      <div className="bars-4">
        <div className="bar-item s-shadow animate">
          <div className="bar-item-title flex-row-between-center">
            <div className="title-wrapper">
              <img className="title-icon" src={curBlockPng} alt="" />
              {t("home.currentBlock")}

            </div>
            <div className="number number-font">{overViewData.head_num}</div>
          </div>
          <div className="bar-item-content flex-row-between-center">
            <div className="content left">
              <div className="wrapper">
                每秒处理交易
                <p className="number-font">{overViewData.total_trxs}</p>
              </div>
              <div className="wrapper">
                历史最高
                <p className="number-font text-red">{overViewData.max_blocktxns_count}</p>
              </div>
            </div>
            <div className="content right">
              <div className="wrapper">
                每秒处理操作
                <p className="number-font">{overViewData.total_actions}</p>
              </div>
              <div className="wrapper">
                历史最高
                <p className="number-font text-red">{overViewData.max_blockactions_count}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bar-item s-shadow animate">
          <div className="bar-item-title">
            <div className="title-wrapper">
              <img className="title-icon" src={nodesPng} alt="" />
              {t("common.header.nav.nodes")}
            </div>
          </div>
          <div className="bar-item-content flex-row-between-center">
            <div className="point left">
              <p className="point-title">当前生产点</p>
              <p>{curProducer || '空'}</p>
            </div>
            <div>
              <img src={forward} alt=""></img>
            </div>
            <div className="point right">
              <p className="point-title t-right">下一个生产点</p>
              <p className="t-right">{nextProducer || '空'}</p>
            </div>
          </div>
        </div>
        <div className="bar-item  s-shadow no-mb animate">
          <div className="bar-item-title  flex-row-between-center">
            <div className="title-wrapper">
              <img className="title-icon" src={latestBlockPng} alt="" />
              最新不可逆区块
            </div>
            <img className="fresh-sign" src={fresh_sign} alt="" />
          </div>
          <div className="bar-item-content flex-row-between-center fresh">
            <p className="number-font">{overViewData.irreversible_num}</p>
          </div>
        </div>
        <div className="bar-item  s-shadow no-mb  animate">
          <div className="bar-item-title">
            <div className="title-wrapper">
              <img className="title-icon" src={statusPng} alt="" />
              {t("home.realTimeStatus")}
            </div>
          </div>
          <div className="bar-item-content">
            <div className="content-wrapper flex-row-between-center">
              <p className="left">CPU上限</p>
              <p className="right number-font">{ramGlobal?.max_block_cpu_usage * ramGlobal?.target_block_cpu_usage_pct/10000}MB/ {ramGlobal?.max_block_cpu_usage}MB</p>
            </div>
            <div className="content-wrapper flex-row-between-center">
              <p className="left">内存RAM</p>
              <p className="right  number-font">{(ramGlobal?.total_ram_bytes_reserved / 1024 / 1024 / 1024).toFixed(2)} / {(ramGlobal?.max_ram_size / 1024 / 1024 / 1024)}GB</p>
            </div>
            <div className="content-wrapper flex-row-between-center">
              <p className="left">NET带宽上限</p>
              <p className="right  number-font">0 KB/0 MB</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bars-1 section-box animate">
        <div className="bars-header flex-row-between-center">
          <div className="header-left">
            <img src={header_logo} alt="" />
          </div>
          {/* <div className="header-right">
            <div className="trend number-font">
              1.43%
              <img src={rise_icon_green} alt="" />{" "}
            </div>
            <p className="number-font">
              $2.591<span className="c-909399 unit">/USD</span>
            </p>
          </div> */}
        </div>
        <div className="amax-list">
          <div className="amax-list-item">
          <div className="title c-909399">AMAX总供应量</div>
            <div className="flex-row-between-center">
              <div className="flex-auto c-909399 flex-row-start-center">
                <div className="progress"></div>
              </div>
            <div>
              <span className="number-font">{totalSupply}</span>
              <span className="c-909399 unit">/AMAX</span>
            </div>
            </div>
          </div>
          <div className="amax-list-item">
            <div className="title c-909399">已质押</div>
            <div className="flex-row-between-center">
              <div className="flex-auto c-909399 flex-row-start-center">
                <div className="progress" style={{width:`${(+totalPledge/ +totalSupply * 100)}%`}} ></div>
              </div>
              <div>
                <span className="number-font">{totalPledge}</span>
                <span className="c-909399 unit">/AMAX</span>
              </div>
            </div>
          </div>
        </div>
        <a href="https://amax.network">
          <img className="banner" src={amax_banner} alt="" />
        </a>
        <div className="bottom-text flex-row-between-center">
          <p className="c-909399">当前内存价格</p>
          <p>
            <span className="number number-font">{ramPrice}</span>/AMAX/KB
          </p>
        </div>
      </div>
    </div>
    </Spin>
  );
};

export default memo(OverView);
