import { memo } from "react";
import "./index.scss";

export interface TableProps {
  data?:any[]
}

const TransactionTable: React.FunctionComponent<TableProps> = ({data}) => {
  return (
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
            {data && data.map((item,i) => {
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
  );
};

export default memo(TransactionTable);




