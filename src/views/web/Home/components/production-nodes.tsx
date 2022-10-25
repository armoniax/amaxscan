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
            <td style={{textAlign:'center'}}>排名</td>
            <td style={{textAlign:'center'}}>图标</td>
            <td style={{textAlign:'center'}}>节点账号</td>
            <td style={{textAlign:'center'}}>完整名称</td>
            <td style={{textAlign:'center'}}>状态</td>
            <td style={{textAlign:'center'}}>票数</td>
            <td>每日奖励</td>
          </tr>
          {[1, 2, 3, 4, 5].map((item, i) => {
            return (
              <tr key={i}>
                <td style={{textAlign:'center'}}>{i + 1}</td>
                <td style={{textAlign:'center'}}>
                  <img src={node_icon} alt="" />
                </td>
                <td style={{textAlign:'center'}}>newdex.bp</td>
                <td style={{textAlign:'center'}}>Newdex</td>
                <td style={{textAlign:'center'}}>
                  <div className="tag">主节点</div>
                </td>
                <td style={{textAlign:'center'}} className="number-font" width={240}>
                  182,590,697 <span className="text-gray">(3.001%)</span>
                  &nbsp;&nbsp;&nbsp;
                  <span className="text-orange">-2.1K&nbsp;&nbsp;&nbsp;↑</span>
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
        <Pagination total={200} onChange={onChangePage}/>
      </div>
    </div>
  );
};

export default memo(ProductionNodes);
