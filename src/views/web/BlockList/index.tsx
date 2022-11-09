import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import ServerApi from '@/api'
import "./index.scss";
import BlockList from "@/components/BlockList";
import Pagination from "@/components/Pagination";


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
    <div className="latest-block section-box page">
      <BlockList data={latestBlockList} />
      <div className="flex-row-end-center"><Pagination total={latestBlockList.length} /></div>
    </div>
  );
};

export default Baseweb(memo(BlockListPage));
