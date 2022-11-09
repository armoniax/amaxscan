import TransactionTable from "@/components/TransactionTable";
import { FC, memo, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServerApi from '@/api'
import "../index.scss";

const LatestTransaction: FC = (): ReactElement => {

  // const [transactionList,setTransactionList] = useState<any[]>([])
  const {
      getLastBlocksData
  } = ServerApi


  useEffect(() => {
    const initData = async () => {
        // const responseData = await getLastBlocksData(6)
        // setTransactionList(createTransactionsArray(responseData))
    }
    void initData()
  }, [getLastBlocksData])
  return (
    <div className="latest-transaction section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">最新交易</p>
        <Link to={{ pathname: "/transaction-list"}} className="flex-row-start-center">更多交易 <i className="arrow-icon"></i></Link>
      </div>
      {/* <TransactionTable data={transactionList} /> */}
    </div>
  );
};

export default memo(LatestTransaction);
