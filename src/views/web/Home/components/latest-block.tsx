import {FC, memo, ReactElement} from "react";
import {Link} from "react-router-dom";
import "../index.scss";
import BlockList from "@/components/BlockList";

interface PropType {
  data: Array<any>;
}

const LatestBlock: FC<PropType> = ({data}):ReactElement => {
    return (
       <>
        <div className="latest-block section-box">
            <div className="section-box-header flex-row-between-center">
                <p className="title">最新区块</p>
                <Link to={{pathname: '/block-list'}} className="flex-row-start-center">更多区块 <i
                    className="arrow-icon"></i></Link>
            </div>
            <BlockList data={data}/>
        </div>
      </>
    );
};

export default memo(LatestBlock);