import { memo } from "react";
// import { useTranslation } from "react-i18next";
import node_icon from "@/assets/images/web/node_icon.png";
import Pagination from "@/components/Pagination";
import "./index.scss";
import { useHistory } from "react-router-dom";
export interface ListProps {
  showPage?: boolean;
  data?: any[];
}

const ProducerTable: React.FunctionComponent<ListProps> = ({
  showPage = false,
  data,
}) => {
  const history = useHistory();
  // const { t } = useTranslation();
  const onChangePage = (pageNum) => {
    console.log(pageNum, "pageNum");
  };
  return (
    <div>
      <table className="producer-list-table">
        <tbody>
          <tr className="producer-list-table-header">
            <td style={{ textAlign: "center" }}>排名</td>
            <td style={{ textAlign: "center" }}>图标</td>
            <td style={{ textAlign: "center" }}>节点账号</td>
            <td style={{ textAlign: "center" }}>完整名称</td>
            <td style={{ textAlign: "center" }}>状态</td>
            <td style={{ textAlign: "center" }}>票数</td>
            <td>每日奖励</td>
          </tr>
          {data &&
            data.map((item, i) => {
              return (
                <tr
                  key={i}
                  onClick={() => {
                    history.push("/producer-detail");
                  }}
                >
                  <td style={{ textAlign: "center" }}>{i + 1}</td>
                  <td style={{ textAlign: "center" }}>
                    <img src={node_icon} alt="" />
                  </td>
                  <td style={{ textAlign: "center" }}>newdex.bp</td>
                  <td style={{ textAlign: "center" }}>Newdex</td>
                  <td style={{ textAlign: "center" }}>
                    <div className="tag">主节点</div>
                  </td>
                  <td
                    style={{ textAlign: "center" }}
                    className="number-font"
                    width={240}
                  >
                    182,590,697 <span className="text-gray">(3.001%)</span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="text-orange">
                      -2.1K&nbsp;&nbsp;&nbsp;↑
                    </span>
                  </td>
                  <td>
                    <span className="number-font">967 AMAX</span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="page-bottom">
        {showPage && <Pagination total={data.length} onChange={onChangePage} />}
      </div>
    </div>
  );
};

export default memo(ProducerTable);
