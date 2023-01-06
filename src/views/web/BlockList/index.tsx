import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import ServerApi from '@/api'
import "./index.scss";
import BlockList from "@/components/BlockList";
import { Spin } from "antd";


const BlockListPage: FC = (): ReactElement => {
  const [latestBlockList,setLatestBlockList] = useState<any[]>([])
  const [loading,setLoading] = useState(false)
  const {
      getLastBlocksData
  } = ServerApi

  useEffect(() => {
    const initData = async () => {
        setLoading(true)
        const responseData = await getLastBlocksData(30)
        setLatestBlockList(responseData)
        setLoading(false)
    }
    void initData()
  }, [getLastBlocksData])

  return (
    <Spin spinning={loading}  tip="Loading...">
      <div className="latest-block section-box page">
        <BlockList data={latestBlockList} />
      </div>
    </Spin>

  );
};

export default Baseweb(memo(BlockListPage));
