import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";
import { RouteComponentProps } from "react-router-dom";
import ServerApi from "@/api";
const { getKeyAccounts } = ServerApi;
const PublicKeyList: FC<RouteComponentProps<{ publicKey: string }>> = (
  props
): ReactElement => {
  const [keyList, setKeyList] = useState([]);
  const {
    match: {
      params: { publicKey },
    },
  } = props;
  useEffect(() => {
    const initData = async () => {
      const res = await getKeyAccounts(publicKey);
      setKeyList(res.accounts)
    };
    initData()

  }, [publicKey]);
  return (
    <div className="public-key-list section-box">
      <div className="section-box-header">
        <p className="title">公钥（Public Key）</p>
      </div>
      <p className="current-key">
        Key： <span className="c-909399">{publicKey}</span>{" "}
      </p>
      <div className="fs-18 c-303333">账户</div>
      <div className="account-list">
        {keyList.map((item, i) => {
          return (
            <div className="account-list-item" key={i}>
              {item.account_name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Baseweb(memo(PublicKeyList));
