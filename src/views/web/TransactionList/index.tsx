import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";
import ServerApi from "@/api";
import TransactionTable from "@/components/TransactionTable";
import socket from "@/api/socket";
import { Spin } from "antd";

const TransactionList: FC = (): ReactElement => {
  const [transactionList, setTransactionList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true)
      const res = await getLastBlocksData(20);
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
    <div className="transaction-list section-box">
      <Spin spinning={loading}  tip="Loading...">
        <TransactionTable data={transactionList} />
      </Spin>
    </div>
  );
};

export default Baseweb(memo(TransactionList));
