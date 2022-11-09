import { FC, memo, ReactElement} from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";
import ProducerTable from "@/components/ProducerTable";
import Pagination from "@/components/Pagination";
const ProducerListPage: FC = (): ReactElement => {
  return (
    <div className="section-box">
      <ProducerTable/>
      <div className="flex-row-end-center"><Pagination total={12} /></div>
    </div>
  );
};

export default Baseweb(memo(ProducerListPage));
