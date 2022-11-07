import TransactionTable from "@/components/TransactionTable";
import { FC, memo, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServerApi from '@/api'
import "../index.scss";

const LatestTransaction: FC = (): ReactElement => {
  // const createTransactionsArray = (data: any) => {
  //   if (!data) {
  //     return;
  //   }
  //   let transactions = [];

  //   data.forEach((elem) => {
  //     if (elem.transactions && elem.transactions.length > 0) {
  //       elem.transactions.forEach((tr) => {
  //         if (!state.trxObj[elem.block_num]) {
  //           state.trxObj[elem.block_num] = [];
  //         }
  //         let actions = [];
  //         if (tr.trx && tr.trx.transaction && tr.trx.transaction.actions) {
  //           actions = tr.trx.transaction.actions.map((act) => {
  //             act.txid = tr.trx.id;
  //           });
  //           console.log(actions);

  //           Array.prototype.push.apply(
  //             state.trxObj[elem.block_num],
  //             tr.trx.transaction.actions
  //           );
  //         }
  //       });
  //     }
  //   });

  //   Object.keys(state.trxObj).forEach((key) => {
  //     Array.prototype.push.apply(transactions, state.trxObj[key]);
  //   });
  //   transactions.reverse();

  //   if (transactions.length >= offsetPageElems.value) {
  //     let blocks = Object.keys(state.trxObj);
  //     blocks.forEach((key, index) => {
  //       if (index < blocks.length - offsetPageElems.value) {
  //         delete state.trxObj[key];
  //       }
  //     });
  //     return transactions.slice(0, offsetPageElems.value);
  //   }

  //   return transactions;
  // };
  const [transactionList,setTransactionList] = useState<any[]>([])
  const {
      getLastBlocksData
  } = ServerApi


  useEffect(() => {
    const initData = async () => {
        const responseData = await getLastBlocksData(6)
        setTransactionList(responseData)
    }
    void initData()
  }, [getLastBlocksData])
  return (
    <div className="latest-transaction section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">最新交易</p>
        <Link to={{ pathname: "/transaction-list"}} className="flex-row-start-center">更多交易 <i className="arrow-icon"></i></Link>
      </div>
      <TransactionTable data={transactionList} />
    </div>
  );
};

export default memo(LatestTransaction);
