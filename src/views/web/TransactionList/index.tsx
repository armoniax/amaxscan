import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";
import ServerApi from "@/api";
import TransactionTable from "@/components/TransactionTable";
import socket from "@/api/socket";

const ProducerList: FC = (): ReactElement => {
  const [transactionList, setTransactionList] = useState<any[]>([]);
  const { getLastBlocksData } = ServerApi;
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

    return transactions;
  };

  useEffect(() => {
    const initData = async () => {
      const res = await getLastBlocksData(20);
      setTransactionList(createTransactionsArray(res));
    };
    void initData();
    return () => {
      socket.close();
      socket.disconnect();
    };
  }, [getLastBlocksData]);
  return (
    <div className="transaction-list section-box">
      <TransactionTable data={transactionList} />
    </div>
  );
};

export default Baseweb(memo(ProducerList));
