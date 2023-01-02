import React, { memo } from "react";
// import "./index.scss";
import key_icon from "@/assets/images/web/key_icon.png";
import { Link } from "react-router-dom";
export interface keyProps {
  data?: any[];
}

const KeyItem: React.FunctionComponent<keyProps> = ({ data }) => {
  return (
    <ul>
      {data.map((item, index) => {
        return (

            <li key={index}>
              <div className="keys-tree-item">
                <span className="title">{item.perm_name}</span>
                <div className="key-set">
                {
                    item.required_auth?.keys?.map((el,idx)=>{
                      return (
                        <span className="ct" key={idx}>
                        ＋{el.weight}
                        <img className="key-icon" src={key_icon} alt="" />
                        <Link to={{pathname: `/publicKey-list/${el.key}`,}} className="c-50BF8C" >
                          {el.key}
                        </Link>
                      </span>
                      )
                    })
                  }
                </div>
              </div>
              {item.children && <KeyItem data={item.children}/>}
            </li>
        );
      })}
              </ul>

  );
};

export default memo(KeyItem);
