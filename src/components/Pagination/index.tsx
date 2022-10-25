import React, { memo, useState } from 'react'
import './index.scss'
export interface PageProps {
  onChange:Function,
  total:number,
  sizeOptions?:any[]
}

const Pagination: React.FunctionComponent<PageProps> = ({total,onChange,sizeOptions}) => {
  const [currentPage,setCurrentPage] = useState<number>(1)
  const [startPage,setStartPage] = useState<number>(1)
  const pageSizeOptions = sizeOptions ? sizeOptions : [10,20,30]
  const [currentSize,setCurrentSize] = useState<number>(pageSizeOptions[0])
  const groupCount:number = 7
  let totalPage = Math.ceil(total/pageSizeOptions[0])

  const createPage = () => {
    let pages = []

    //左箭头
    pages.push(<li className={`page-num-list-item${currentPage === 1 ? ' disabled':''}`} onClick={()=>{prePage()}} key={-1}> <i className="arrow-icon left"></i></li>)

    // 页数
    if (totalPage <= 11) {
      for (let i = 0; i < totalPage; i++) {
        pages.push(
          <li className={`page-num-list-item${currentPage === i+1 ? ' active':''}`} onClick={()=>{changePage(i+1)}} key={i}>{i+1}</li>
        )
      }
    }else{
      pages.push(
        <li className={`page-num-list-item${currentPage === 1 ? ' active':''}`} onClick={()=>{changePage(1)}} key={0}>1</li>
      )
      let pageLength = 0;

      if (groupCount + startPage > totalPage) {
        pageLength = totalPage
      } else {
        pageLength = groupCount + startPage;
      }

      //前面省略号(当当前页码比分组的页码大时显示省略号)
      if (currentPage >= groupCount) {
        pages.push(<li className="page-num-list-item" key={-2}>···</li>)
      }

      //非第一页和最后一页显示
      let _pageLength
      _pageLength = totalPage - (currentPage + 3) >= 3 ? pageLength : pageLength + 1
      if (startPage  === 1) {
        _pageLength = pageLength + 2
      }
      for (let i = startPage; i < _pageLength; i++) {
        if (i <= totalPage - 1 && i > 1) {
          pages.push(<li className={`page-num-list-item${currentPage === i ? ' active':''}`} onClick={()=>{changePage(i)}} key={i - 1}>{i}</li>)
        }
      }


      //后面省略号
      if (totalPage - startPage > groupCount + 1) {
        pages.push(<li className="page-num-list-item" key={-3}>···</li>)
      }

      pages.push(
        <li className={`page-num-list-item${currentPage === totalPage ? ' active':''}`} onClick={()=>{changePage(totalPage)}} key={totalPage - 1}>{totalPage}</li>
      )
    }


    //右箭头
    pages.push(<li className={`page-num-list-item${currentPage === totalPage ? ' disabled':''}`} onClick={()=>{nextPage()}} key={totalPage+1}><i className="arrow-icon right"></i></li>)
    return pages
  }

  const prePage = () =>{
    if (currentPage - 1 === 0) {
      return false
    }
    // console.log('往前');
    changePage(currentPage - 1)
  }

  const nextPage = () =>{
    if (currentPage === totalPage) {
      return false
    }
    // console.log('往后');
    changePage(currentPage + 1)
  }

  const changePage = (currentPage) => {
    setCurrentPage(currentPage)
    onChange(currentPage)
    if (currentPage >= 7) {
      if (totalPage - currentPage < 5) {
        return
      }
      setStartPage(currentPage - 3)
    }

    if (currentPage < 7) {
      setStartPage(1)
    }

    //第一页时重新设置分组的起始页
    if (currentPage === 1) {
      setStartPage(1)
    }

  }

  const pageList = createPage()

  const changeSize = (size) => {
    setCurrentSize(size)
    totalPage = Math.ceil(total/ size)
    // let pageList = createPage()
    // setPageList(pageList)
  }

  return(
    <div className="page-bar">
        每页
        <div className="select-box">
          <p className="page-size">{currentSize}</p>
          <i className="arrow-down"></i>
          <div className="select-box-dropdown-menu">
            <ul className="dropdown-menu-list">
              {
                pageSizeOptions.map(item=>{
                  return (<li className="dropdown-menu-list-item" onClick={()=>{changeSize(item)}} key={item}>{item}</li>)
                })
              }
            </ul>
          </div>
        </div>
        条
        <ul className="page-num-list">
          {pageList}
        </ul>
      </div>
  )
}

export default memo(Pagination)
