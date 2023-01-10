import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import { useTranslation } from "react-i18next";
import "./index.scss";
import Overview from "./components/overview";
import LatestBlock from "./components/latest-block";
import LatestTransaction from "./components/latest-transaction";
import ProducerList from "./components/producer-list";
// import APOSBlock from './components/apos-block'
// import MarketDynamic from "./components/market-dynamic";
import { useHistory } from "react-router-dom";
import search_icon from "@/assets/images/web/search_icon.png";
import ServerApi from "@/api";
import socket from "@/api/socket";
import { searchByInsert } from "@/utils";
import { Spin } from "antd";

const ungerKey = "AMAX1111111111111111111111111111111114T1Anm";
const sortArray = (data: any) => {
  if (!data) {
    return;
  }
  const result = data
    .sort((a, b) => {
      return b.total_votes - a.total_votes;
    })
    .map((elem, index) => {
      if (elem.producer_key === ungerKey) {
        return false;
      }
      let eos_votes = Math.floor(calculateEosFromVotes(elem.total_votes));
      elem.all_votes = Number(eos_votes).toLocaleString();
      // elem.total_votes = Number(eos_votes).toLocaleString();
      return elem;
    });
  return result.slice(0, 5);
};

const createTransactionsArray = (data: any) => {
  if (!data) {
    return;
  }
  let transactions = [];
  data.forEach((item) => {
    if (item.transactions && item.transactions.length) {
      item.transactions.forEach((txn) => {
        transactions.push({ block_num: item.block_num, ...txn });
      });
    }
  });
  // console.log(transactions, "transactions");

  return transactions.slice(0, 5);
};

const calculateEosFromVotes = (votes) => {
  let date = +new Date() / 1000 - 946684800; // 946... start timestamp
  // if (frontConfig.value.coin === 'WAX') {
  //     let weight = parseInt(`${date / (86400 * 7)}`, 10) / 13;
  //     return votes / 2 ** weight / 100000000;
  // }
  let weight = parseInt(`${date / (86400 * 7)}`, 10) / 52; // 86400 = seconds per day 24*3600
  return votes / 2 ** weight / 100000000;
};

const Home: FC = (): ReactElement => {
  const [latestBlockList, setLatestBlockList] = useState<any[]>([]);
  const [transactionList, setTransactionList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const history = useHistory();
  const { t } = useTranslation();
  const { getLastBlocksData } = ServerApi;
  useEffect(() => {
    console.log('修改了 ----');

    socket.on("get_last_blocks", (res: any) => {
      setLatestBlockList(sortArray(res));
      setTransactionList(createTransactionsArray(res));
    });
  }, []);

  useEffect(() => {
    const initData = async () => {
      setLoading(true)
      const res = await getLastBlocksData(20);
      setLatestBlockList(sortArray(res));
      setTransactionList(createTransactionsArray(res));
      setLoading(false)
    };
    void initData();
    return () => {
      socket.close();
      socket.disconnect();
    };
  }, [getLastBlocksData]);

  return (
    <div>
      <div className="m-search-bar section-box animate">
        <img src={search_icon} alt="" className="search-icon" onClick={
          ()=>{
            searchByInsert(searchWord, history)
          }
        } />
        <input
          type="text"
          placeholder={t("home.searchPlace")}
          onInput={(e: any) => {
            setSearchWord(e.target.value);
          }}
        />
      </div>
      <Overview />

      <Spin spinning={loading}  tip="Loading...">
        <LatestBlock data={latestBlockList} />
      </Spin>
      <Spin spinning={loading}  tip="Loading...">
        <LatestTransaction data={transactionList} />
      </Spin>
      {/* <APOSBlock/> */}
      {/* <MarketDynamic /> */}
      <ProducerList></ProducerList>
    </div>
  );
};

export default Baseweb(memo(Home));
