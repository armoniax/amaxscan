import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import avatar from "@/assets/images/web/node_icon.png";
import ChainData from "./components/chain-data";
import "./index.scss";
import Transactions from "./components/transactions";
import AccountDetail from "./components/account-detail";
import { RouteComponentProps } from "react-router-dom";
import ServerApi from "@/api";
import { StorageHelper } from "@/utils/storage";
const { getAccountDetail, getCurrencyBalance } = ServerApi;
const { getFrontConfig } = StorageHelper;
const frontConfig = getFrontConfig();
const ProducerDetail: FC<RouteComponentProps<{ account: string }>> = (
  props
): ReactElement => {
  const [detailData, setDetailData] = useState<any>({});
  const [balance, setBalance] = useState<number>(0);
  const {
    match: {
      params: { account },
    },
  } = props;

  useEffect(() => {
    const initData = async () => {
      const res = await getAccountDetail(account);
      console.log(res, "res");
      getBalance(account);
      setDetailData(res);
    };
    const getBalance = async (account: string) => {
      const res = getCurrencyBalance({
        tokenContract: frontConfig.tokenContract,
        account,
        tokenSymbol: frontConfig.coin,
      });
      console.log("getBalance-----", res);

      let unstaked = !res[0] ? 0 : Number(res[0].split(" ")[0]);
      let staked = 0;
      if (detailData.voter_info && detailData.voter_info.staked) {
        staked = detailData.voter_info.staked;
      }
      if (frontConfig.customBalance) {
        //include precision
        setBalance(unstaked);
      } else {
        setBalance(unstaked + staked / 100000000);
      }
      // state.eosRate = this.MainService.getEosPrice();
    };
    void initData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className="producer-detail">
      <div className="producer-detail-account section-box">
        <div className="account-info">
          <img src={avatar} alt="" />
          <div className="flex-col-between-stretch">
            <p className="account-info-name">{detailData?.account_name}</p>
            <p className="account-info-desc">
              由<span className="c-50BF8C">{detailData?.creator}</span>激活
            </p>
          </div>
        </div>
        <div className="account-balance c-909399 flex-col-between-stretch">
          <p className="account-balance-title">AMAX 账户余额</p>
          <p className="account-balance-number number-font c-FA454B">
            {balance} AMAX
          </p>
        </div>
      </div>
      <AccountDetail data={detailData} />
      <ChainData></ChainData>
      <Transactions />
    </div>
  );
};

export default Baseweb(memo(ProducerDetail));
