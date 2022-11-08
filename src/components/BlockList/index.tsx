import moment from "moment";
import { memo } from "react";
import { useHistory } from "react-router";
import "./index.scss";
export interface ListProps {
  showPage?:boolean,
  data?:any[]
}
const handleTime = (timestamp?: any) => {
  return moment(timestamp).local().format('YYYY-MMM-DD,  HH:mm:ss');
};

const BlockList: React.FunctionComponent<ListProps> = ({showPage = false,data}) => {
  const history = useHistory()
  return (
    <table className="common-table latest-block-list">
      <tbody>
      {
        data.map((item,i) => {
         return(
          <tr className="latest-block-list-item text-align-between" key={item.id}>
            <td className="item-title pointer main-color" onClick={()=>{
              history.push({ pathname: `/block-detail/${item?.block_num }` });
            }}>{`#${item?.block_num}`}</td>
            <td className="item.time">{handleTime(item?.timestamp)}</td>
            <td><span className="item-type pointer main-color">{item?.producer}</span></td>
            <td className="item-transaction">交易<span className="text-red">{item?.transactions.length}</span>笔</td>
          </tr>
          )
        })
      }
      </tbody>
    </table>
  );
};

export default memo(BlockList);
