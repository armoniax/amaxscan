import { FC, memo, ReactElement } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import search_icon from "@/assets/images/web/search_icon.png";
import "./index.scss";

const TokenList: FC = (): ReactElement => {
  const _list =[]
  for (let i = 0; i < 30; i++) {
    _list.push(i)
  }
  return (
    <div>
      <div className="token-list section-box">
        <div className="token-list-search flex-row-start-center">
          <img src={search_icon} alt="" />
          <input type="text" placeholder="搜索代币的名称或者合约" />
        </div>
        <table className="common-table">
          <tr className="table-header text-align-between">
            <td>名称</td>
            <td>合约地址</td>
            <td>已发行供应量</td>
          </tr>
          {
            _list.map((item,i)=>{
              return (
                <tr className="text-align-between">
                  <td>AMAX</td>
                  <td className="c-50BF8C" >amax.token</td>
                  <td className="number-font" >4784997342</td>
                </tr>
              )
            })
          }
        </table>
      </div>
    </div>
  );
};

export default Baseweb(memo(TokenList));
