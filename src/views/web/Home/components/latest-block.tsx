import {FC, memo, ReactElement, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ServerApi from '@/api'
import "../index.scss";
import BlockList from "@/components/BlockList";
import socket from '@/api/socket'
import TransactionTable from "@/components/TransactionTable";
// import TransactionList from "../../TransactionList";
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
      return elem
    });
  return result.slice(0,5);
};

const createTransactionsArray = (data: any) => {
  if (!data) {
    return;
  }
  let transactions = []
  data.forEach(item=>{
    if (item.transactions && item.transactions.length) {
      item.transactions.forEach(txn=>{
        transactions.push({block_num:item.block_num,...txn})
      })
    }

  })
  console.log(transactions,'transactions');

  return transactions.slice(0,5);
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

const LatestBlock: FC = (): ReactElement => {
    const [latestBlockList, setLatestBlockList] = useState<any[]>([])
    const [transactionList, setTransactionList] = useState<any[]>([]);
    const {
        getLastBlocksData
    } = ServerApi
    useEffect(() => {
        socket.on('get_last_blocks', (res: any) => {
          setLatestBlockList(sortArray(res))
          setTransactionList(createTransactionsArray(res));
        });
    }, [])

    useEffect(() => {
        const initData = async () => {
            const res = await getLastBlocksData(4)
            setLatestBlockList(sortArray(res))
            setTransactionList(createTransactionsArray(res));
        }
        void initData()
        return ()=>{
          socket.close();
          socket.disconnect();
        }
    }, [getLastBlocksData])
    return (
       <>
        <div className="latest-block section-box">
            <div className="section-box-header flex-row-between-center">
                <p className="title">最新区块</p>
                <Link to={{pathname: '/block-list'}} className="flex-row-start-center">更多区块 <i
                    className="arrow-icon"></i></Link>
            </div>
            <BlockList data={latestBlockList}/>
        </div>
        <div className="latest-transaction section-box">
          <div className="section-box-header flex-row-between-center">
            <p className="title">最新交易</p>
            <Link to={{ pathname: "/transaction-list"}} className="flex-row-start-center">更多交易 <i className="arrow-icon"></i></Link>
          </div>
          <TransactionTable data={transactionList} />
        </div>
      </>
    );
};

export default memo(LatestBlock);