import ProducerTable from "@/components/ProducerTable";
import { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import "../index.scss";

const ProducerList: FC = (): ReactElement => {
  return (
    <div className="producer-list section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">生产节点</p>
        <Link to={{pathname:'/producer-list'}} className="flex-row-between-center">
          更多节点 <i className="arrow-icon"></i>
        </Link>
      </div>
      <ProducerTable length={7}></ProducerTable>
    </div>
  );
};

export default memo(ProducerList);
