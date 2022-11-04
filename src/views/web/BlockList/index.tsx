import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import ServerApi from '@/api'
import "./index.scss";
import BlockList from "@/components/BlockList";


const BlockListPage: FC = (): ReactElement => {
  const [latestBlockList,setLatestBlockList] = useState<any[]>([])
  const {
      getLastBlocksData
  } = ServerApi

  useEffect(() => {
    const initData = async () => {
        const responseData = await getLastBlocksData(20)
        setLatestBlockList(responseData)
    }
    void initData()
  }, [getLastBlocksData])

  return (
    <div className="latest-block section-box">
      <BlockList data={latestBlockList} />
    </div>
  );
};

export default Baseweb(memo(BlockListPage));
