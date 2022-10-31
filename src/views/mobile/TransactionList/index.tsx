import { FC, memo, ReactElement } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";

const ProducerList: FC = (): ReactElement => {
  return (
    <div>
      ProducerList
    </div>
  );
};

export default Baseweb(memo(ProducerList));
