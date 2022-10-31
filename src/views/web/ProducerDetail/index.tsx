import { FC, memo, ReactElement } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import avatar from "@/assets/images/web/node_icon.png";
import ChainData from './components/chain-data'
import "./index.scss";
import Transactions from "./components/transactions";
import AccountDetail from "./components/account-detail";

const ProducerDetail: FC = (): ReactElement => {
  return (
    <div className="producer-detail">
      <div className="producer-detail-account section-box">
        <div className="account-info">
          <img src={avatar} alt="" />
          <div className="flex-col-between-stretch">
            <p className="account-info-name">账号IDxxXXX</p>
            <p className="account-info-desc">
              由<span className="c-50BF8C">账号</span>激活
            </p>
          </div>
        </div>
        <div className="account-balance c-909399 flex-col-between-stretch">
          <p className="account-balance-title">AMAX 账户余额</p>
          <p className="account-balance-number number-font c-FA454B">
            18518545 AMAX
          </p>
        </div>
      </div>
      <AccountDetail />
      <ChainData></ChainData>
      <Transactions/>
    </div>
  );
};

export default Baseweb(memo(ProducerDetail));
