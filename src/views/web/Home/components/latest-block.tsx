import {FC, memo, ReactElement, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ServerApi from '@/api'
import "../index.scss";
import BlockList from "@/components/BlockList";
// import TransactionTable from "@/components/TransactionTable";
import socket from '@/api/socket'
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
  return result;
};

// const createTransactionsArray = (data: any) => {
//   if (!data) {
//     return;
//   }
//   let transactions = []
//   data.forEach(item=>{
//     if (item.transactions && item.transactions.length) {
//       item.transactions.forEach(item=>{
//         transactions.push({cpu_usage_us:item.cpu_usage_us,net_usage_words:item.net_usage_words,id:item.trx?.id,actions:item.trx?.transaction?.actions.length})
//       })
//     }

//   })
//   return transactions;
// };

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
    // const [transactionList, setTransactionList] = useState<any[]>([]);
    const {
        getLastBlocksData
    } = ServerApi
    useEffect(() => {
        // socket.on('get_info', (res: any) => {
        //     console.log('get_info', res);
        // });
        // socket.on('users_online', (res: any) => {
        //     console.log('users_online', res);
        // });

        // socket.on('get_tps_blocks', (res: any) => {
        //     console.log('get_tps_blocks', res.length, res);

        // });
        socket.on('get_last_blocks', (res: any) => {
          setLatestBlockList(sortArray(res))
          // setTransactionList(createTransactionsArray(res));
        });
        // socket.on('get_aggregation', (res: any) => {
        //     console.log('get_aggregation', res);
        // });
    }, [])

    useEffect(() => {
        const initData = async () => {
            const res = await getLastBlocksData(9)
            setLatestBlockList(sortArray(res))
            // setTransactionList(createTransactionsArray(res));
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
      </>
    );
};

export default memo(LatestBlock);