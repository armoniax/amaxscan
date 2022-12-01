import { handleTime } from "@/utils";
import { memo } from "react";
import { useHistory } from "react-router";
import "./index.scss";
export interface ListProps {
  showPage?:boolean,
  data?:any[]
}


const BlockList: React.FunctionComponent<ListProps> = ({showPage = false,data}) => {
  const history = useHistory()
  return (
    <table className="common-table latest-block-list">
      <tbody>
      {
        data.map((item,i) => {
         return(
          <tr className="latest-block-list-item text-align-between" key={item.id}>
            <td className="item-title main-color"> <span className="pointer" onClick={()=>{history.push(`/block-detail/${item?.block_num }`);}}>{`#${item?.block_num}`}</span></td>
            <td className="item.time">{handleTime(item?.timestamp)}</td>
<<<<<<< HEAD
            <td><span className="item-type pointer main-color" onClick={()=>{history.push(`/producer-detail/${item?.producer}`)}}>{item?.producer}</span></td>
=======
            <td><span className="item-type pointer main-color" onClick={()=>{
              history.push(`/producer-detail/${item?.producer }`);
            }}>{item?.producer}</span></td>
>>>>>>> b557e9b8c3b17463f0d7839d1cd072c7c10d583f
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

