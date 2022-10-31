import { FC, memo, ReactElement } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";
import TransactionTable from "@/components/TransactionTable";

const ProducerList: FC = (): ReactElement => {
  const _list = []
  for (let i = 0; i < 20; i++) {
    _list.push(i)
  }
  return (
    <div className="transaction-list section-box">
      <TransactionTable data={_list} />
    </div>
  );
};

export default Baseweb(memo(ProducerList));
