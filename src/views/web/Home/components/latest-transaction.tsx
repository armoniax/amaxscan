import { FC, memo, ReactElement } from "react";
import "../index.scss";

const LatestTransaction: FC = (): ReactElement => {
  return (
    <div className="latest-transaction s-shadow">
      <div className="table-bar">
        <div className="table-bar-title">最新交易</div>
        <table className="transaction-table">
        <tbody>
          <tr className="table-header">
            <td width="180">Transaction ID</td>
            <td>Block Number</td>
            <td>CPU Usage</td>
            <td>NET Usage</td>
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
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      <div className="chart-bar ">
        <a href="/" className="chart-bar-header flex-row-end-center c-909399">更多交易 <i className="arrow-icon"></i> </a>
        <div className="chart-bar-main">
          <div className="title">Actions</div>
          <div className="progress-list">
            <div className="progress-list-item l-10"></div>
            <div className="progress-list-item l-80"></div>
            <div className="progress-list-item l-70"></div>
            <div className="progress-list-item l-70"></div>
            <div className="progress-list-item l-30"></div>
          </div>
          <div className="coordinates">
            <span>0</span>
            <span>2</span>
            <span>4</span>
            <span>6</span>
            <span>8</span>
            <span>10</span>
            <span>12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LatestTransaction);
