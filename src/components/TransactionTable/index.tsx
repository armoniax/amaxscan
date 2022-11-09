import { memo } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";

export interface TableProps {
  data?: any[];
}


const TransactionTable: React.FunctionComponent<TableProps> = ({ data }) => {
  const history = useHistory();

  const goDetail = (hash) => {
    history.push({ pathname: `/transaction-detail/${hash}` });
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
                >
                  <td className="pointer main-color" onClick={() => {
                    goDetail(item.trx.id);
                  }}>
                    <p className="limit-length" title={item.trx?.id}>{item.trx.id}</p>
                  </td>
                  <td className="main-color pointer">
                    <p className="number-font">{item.block_num}</p>
                  </td>
                  <td>
                    <p className="number-font">{item.cpu_usage_us} μS</p>
                  </td>
                  <td>
                    <p className="number-font">{item.net_usage_words} KB</p>
                  </td>
                  <td>
                    <p className="number-font">{item.trx?.transaction?.actions?.length}</p>
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
