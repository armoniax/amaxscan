import TransactionTable from "@/components/TransactionTable";
import { FC, memo, ReactElement} from "react";
import { Link } from "react-router-dom";
import "../index.scss";

interface PropType {
  data: Array<any>;
}

const LatestTransaction: FC<PropType> = ({data}): ReactElement => {
  return (
    <div className="latest-transaction section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">最新交易</p>
        <Link to={{ pathname: "/transaction-list"}} className="flex-row-start-center">更多交易 <i className="arrow-icon"></i></Link>
      </div>
      <TransactionTable data={data} />
    </div>
  );
};

export default memo(LatestTransaction);
