import { FC, memo, ReactElement } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import not_found from "@/assets/images/web/not_found.png";
import "./index.scss";

const NotFound: FC = (): ReactElement => {
  return (
    <div className="not-found">
      <img src={not_found} alt="" />
      <div>页面丢失</div>
    </div>
  );
};

export default Baseweb(memo(NotFound));
