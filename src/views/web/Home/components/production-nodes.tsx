import { FC, memo, ReactElement, useState } from "react";
// import { useTranslation } from "react-i18next";
import node_icon from "@/assets/images/web/node_icon.png";
import "../index.scss";

const ProductionNodes: FC = (): ReactElement => {
  // const { t } = useTranslation();
  const pageInit = () => {
    let pageInit = []
    if (pageNum < 8) {
      for (let i = 0; i < pageNum; i++) {
        pageInit.push(i+1)
      }
    }else{
      for (let i = 0; i < 5; i++) {
        pageInit.push(i+1)
      }
      pageInit.push('...')
      pageInit.push(pageNum)
    }
    return pageInit
  }
  const pageNum = 15
  const [pageList,setPageList] = useState(()=>{
    return pageInit()
  })

  const changePage = (curPage,pageIdx) =>{
    const pageCopy = JSON.parse(JSON.stringify(pageList))
    if (pageIdx === 1) {
      console.log(curPage,'...第一页')
      setPageList(pageInit())
    }
    if (curPage === '...') {
      if (pageIdx === 2) {
        console.log('...');
        if (pageCopy[2] < 8) {
          setPageList([1,2,3,4,5 ,'...',pageNum])
        }else{
          setPageList([1,'...',pageCopy[2]-3,pageCopy[2]-2,pageCopy[2] - 1 ,'...',pageNum])
        }
      }else{
        console.log('后边的。。。',pageCopy[pageIdx - 2],pageNum);
        if (pageCopy[pageIdx - 2] < pageNum - 4) {
          setPageList([1,'...',pageCopy[2] + 3,pageCopy[2] + 4,pageCopy[2] + 5  ,'...',pageNum])
        }else{
          setPageList([1,'...',pageNum - 4,pageNum - 3,pageNum - 2,pageNum - 1,pageNum])
        }
      }
    }
    if (pageCopy[pageCopy.length-2] === '...' && curPage === pageCopy[pageCopy.length-3]) {
      console.log('...之前');
      if (curPage <= pageNum - 4) {
        setPageList([1,'...',curPage -1 ,curPage,curPage + 1 ,'...',pageNum])
      }else{
        setPageList([1,'...',pageNum - 4,pageNum - 3,pageNum - 2,pageNum - 1,pageNum])
      }
    }

    if (pageCopy[1] === '...' && curPage === pageCopy[2]) {
      console.log('...之后');
      if (curPage -1 > 3) {
        setPageList([1,'...',curPage -1,curPage,curPage+1,'...',pageNum])
      }else{
        setPageList([1,2,3,4,5,'...',pageNum])
      }
    }

    if (curPage === pageCopy[pageCopy.length -1]) {
      console.log(curPage,'...最后一页');
      if (pageNum > 7) {
        setPageList([1,'...',pageNum - 4,pageNum - 3,pageNum - 2,pageNum - 1,pageNum])
      }
    }

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
      <div className="page-bar">
        每页
        <div className="select-box">
          <p className="page-size">10</p>
          <i className="arrow-down"></i>
          <div className="select-box-dropdown-menu">
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-list-item">10</li>
              <li className="dropdown-menu-list-item">20</li>
              <li className="dropdown-menu-list-item">30</li>
            </ul>
          </div>
        </div>
        条
        <ul className="page-num-list">
          <li><i className="arrow-icon left"></i></li>
          {
            pageList.map((item,index)=>{
              return(
                <li className="page-num-list-item" onClick={()=>{changePage(item,index+1)}} key={index}>{item}</li>
              )
            })
            // (()=>{
            //   let li = []
            //   if (pageNum > 7) {
            //     for(let i = 0; i < pageList; i++) {
            //       li.push(<li className="page-num-list-item" onClick={()=>{changePage(i+1)}}>{i+1}</li>)
            //     }
            //     li.push(<li className="page-num-list-item s-omit" onClick={()=>{changePage('...')}}>...</li>)
            //     li.push(<li className="page-num-list-item" onClick={()=>{changePage(pageNum)}}>{pageNum}</li>)
            //   }else{
            //     for(let i = 0; i < pageNum; i++) {
            //       li.push(<li className="page-num-list-item" onClick={()=>{changePage(i+1)}}>{i+1}</li>)
            //     }
            //   }
            //   return li
            // })()
          }
          <li><i className="arrow-icon"></i></li>
        </ul>
      </div>
    </div>
  );
};

export default memo(ProductionNodes);
