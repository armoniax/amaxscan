import { memo } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";

export interface TableProps {
  data?: any[];
}


const TransactionTable: React.FunctionComponent<TableProps> = ({ data }) => {
  const history = useHistory();

  const goDetail = (id) => {
    history.push({ pathname: "/transaction-detail", state: { id } });
  };

  return (
    <div className="table-bar">
      <table className="transaction-table">
        <tbody>
          <tr className="table-header">
            <td width="180">Transaction ID</td>
            <td>Block Number</td>
            <td>CPU Usage</td>
            <td>NET Usage</td>
            <td>Actions</td>
          </tr>
          {data &&
            data.map((item, i) => {
            console.log(item);
              return (
                <tr
                  key={i}
                  onClick={() => {
                    goDetail(i);
                  }}
                >
                  <td>
                    <p>{item.id}</p>
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
