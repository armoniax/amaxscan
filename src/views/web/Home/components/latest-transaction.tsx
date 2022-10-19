import { FC, memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import pulldown_icon from "@/assets/images/web/pulldown_icon.png";
import "../index.scss";

const LatestTransaction: FC = (): ReactElement => {
  const { t } = useTranslation();
  console.log(212);

  return (
    <div className="latest-transaction s-shadow">
      <div className="table-bar">
        <div className="table-bar-title">最新交易</div>
        <table className="transaction-table">
          <tr className="table-header">
            <td width="180">Transaction ID</td>
            <td>Block Number</td>
            <td>CPU Usage</td>
            <td>NET Usage</td>
          </tr>
          {[1, 2, 3, 4,5].map(() => {
            return (
              <tr>
                <td>
                  <p>fd838b517b17dsadfsa31cccccc</p>
                </td>
                <td>
                  <p className="number-font">240706426</p>
                </td>
                <td>
                  <p className="number-font">309 μS</p>
                </td>
                <td>
                  <p className="number-font">0.078 KB</p>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="chart-bar"></div>
    </div>
  );
};

export default memo(LatestTransaction);
