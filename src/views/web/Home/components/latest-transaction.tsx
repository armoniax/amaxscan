import { FC, memo, ReactElement } from "react";
import "../index.scss";

const LatestTransaction: FC = (): ReactElement => {
  return (
    <div className="latest-transaction section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">最新交易</p>
        <a href="/#" className="flex-row-start-center">更多交易 <i className="arrow-icon"></i></a>
      </div>
      <div className="table-bar">
      <table className="transaction-table">
        <tbody>
          <tr className="table-header">
            <td width="180">Transaction ID</td>
            <td>Block Number</td>
            <td>CPU Usage</td>
            <td>NFT Usage</td>
            <td>Actions</td>
          </tr>
          {[1, 2, 3, 4,5].map((item,i) => {
            return (
              <tr key={i}>
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
                <td>
                  <p className="number-font">10</p>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(LatestTransaction);
