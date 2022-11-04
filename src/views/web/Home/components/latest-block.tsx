import { FC, memo, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServerApi from '@/api'
import "../index.scss";
import BlockList from "@/components/BlockList";

const LatestBlock: FC = (): ReactElement => {
  const [latestBlockList,setLatestBlockList] = useState<any[]>([])
  const {
      getLastBlocksData
  } = ServerApi

  useEffect(() => {
    const initData = async () => {
        const responseData = await getLastBlocksData(6)
        setLatestBlockList(responseData)
    }
    void initData()
  }, [getLastBlocksData])

  return (
    <div className="latest-block section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">最新区块</p>
        <Link to={{pathname:'/block-list'}} className="flex-row-start-center">更多区块 <i className="arrow-icon"></i></Link>
      </div>
      <BlockList data={latestBlockList} />
    </div>
  );
};

export default memo(LatestBlock);
