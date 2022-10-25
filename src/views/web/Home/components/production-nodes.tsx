import { FC, memo, ReactElement } from "react";
// import { useTranslation } from "react-i18next";
import node_icon from "@/assets/images/web/node_icon.png";
import Pagination from "@/components/Pagination";
import "../index.scss";

const ProductionNodes: FC = (): ReactElement => {
  // const { t } = useTranslation();
  const onChangePage = (pageNum) => {
    console.log(pageNum,'pageNum');
  }
  return (
    <div className="producer-list section-box">
      <div className="section-box-header flex-row-between-center">
        <p className="title">生产节点</p>
        <a href="/" className="flex-row-between-center">
          更多节点 <i className="arrow-icon"></i>
        </a>
      </div>
      <table className="producer-list-table">
        <tbody>
          <tr className="producer-list-table-header">
            <td>排名</td>
            <td>图标</td>
            <td>节点账号</td>
            <td>完整名称</td>
            <td>所在地</td>
            <td>状态</td>
            <td>票数</td>
            <td>每日奖励</td>
          </tr>
          {[1, 2, 3, 4, 5].map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img src={node_icon} alt="" />
                </td>
                <td>newdex.bp</td>
                <td>Newdex</td>
                <td width={220}>
                  <img src={node_icon} className="m-r-10" alt="" />
                  Cayman lslands
                </td>
                <td>
                  <div className="tag">主节点</div>
                </td>
                <td className="number-font" width={240}>
                  182,590,697 <span className="text-gray">(3.001%)</span>
                  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                  <span className="text-orange">-2.1K↑</span>
                </td>
                <td>
                  <span className="number-font">967</span> AMAX
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="page-bottom">
        <Pagination total={200} onChange={onChangePage}/>
      </div>
    </div>
  );
};

export default memo(ProductionNodes);
