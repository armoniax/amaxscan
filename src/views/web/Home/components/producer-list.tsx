import ProducerTable from "@/components/ProducerTable";
import { FC, memo, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServerApi from '@/api'
import "../index.scss";

const ProducerList: FC = (): ReactElement => {
  const [producerList,setProducerList] = useState<any[]>([])
  const {
      getLastBlocksData
  } = ServerApi


  useEffect(() => {
    const initData = async () => {
        const res = await getLastBlocksData(6)
        setProducerList(res)
    }
    void initData()
  }, [getLastBlocksData])
  return (
    <div className="producer-list section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">生产节点</p>
        <Link to={{pathname:'/producer-list'}} className="flex-row-between-center">
          更多节点 <i className="arrow-icon"></i>
        </Link>
      </div>
      <ProducerTable data={producerList}></ProducerTable>
    </div>
  );
};

export default memo(ProducerList);
