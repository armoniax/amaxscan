import { FC, memo, ReactElement} from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";
import ProducerTable from "@/components/ProducerTable";
const ProducerListPage: FC = (): ReactElement => {
  return (
    <div className="section-box">
      <ProducerTable/>
    </div>
  );
};

export default Baseweb(memo(ProducerListPage));
