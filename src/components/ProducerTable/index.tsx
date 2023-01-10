import { memo, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import node_icon from "@/assets/images/web/node_icon.png";
import url_icon from "@/assets/images/web/url_icon.png";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { sortArray } from "@/utils";
import ServerApi from "@/api";
import socket from "@/api/socket";
import { Spin } from "antd";
const { getTableRows} = ServerApi;
export interface ListProps {
  showPage?: boolean;
  length?: number;
}

const ProducerTable: React.FunctionComponent<ListProps> = ({
  showPage = false,
  length,
}) => {
  const history = useHistory();
  const [list, setList] = useState<any[]>([]);
  const [curProducer, setCurProducer] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let votesToRemove
    const createTable = (table: any, totalVotes: number, bpJson: any) => {
      const mainData = table.rows;
      const _data = joinOtherProducerInfo(countRate(sortArray(mainData), totalVotes), bpJson)
      if (length) {
        setList(_data.slice(0,21))
      }else{
        setList(_data);
      }
    };

    const countRate = (data: any[], totalProducerVoteWeight: number) => {

      if (!data) {
        return [];
      }
     votesToRemove = data.reduce((acc, cur) => {
        const percentageVotes =
          (cur.total_votes / totalProducerVoteWeight) * 100;
        if (percentageVotes * 200 < 100) {
          acc += parseFloat(cur.total_votes);
        }
        return acc;
      }, 0);
      data.forEach((elem, index) => {
        elem.index = index + 1;
        // elem.total_votes = (elem.total_votes / 10000).toLocaleString();
        // let precision = 100000000;
        // elem.all_votes = (Number(elem.total_votes.replace(/,/g, "")) / precision).toLocaleString();
        // console.log("elem.total_votes=" + elem.total_votes + ", Number = " + (Number(elem.total_votes)/10000000).toLocaleString() );
        elem.rate = !totalProducerVoteWeight
          ? 0
          : (
              (elem.total_votes / totalProducerVoteWeight) *
              100
            ).toLocaleString();
        elem.rewards = !totalProducerVoteWeight
          ? 0
          : countRewards(elem.total_votes, elem.index, totalProducerVoteWeight);
      });
      return data;
    };
    const countRewards = (total_votes: number, index: number, totalProducerVoteWeight: number) => {
      let position = index;
      let reward = 0;

      //86400 * 365 blocks for e 1st year, no reward
      if (position > 31536000) {
          let percentageVotesRewarded = (total_votes / (totalProducerVoteWeight - votesToRemove)) * 100;
          reward = percentageVotesRewarded; //FIXME
      }

        return Math.floor(reward).toLocaleString();
    };
    const joinOtherProducerInfo = (sortedArr: any[], joinArr: any[]) => {

      let joinObj: any = {};
      if (!joinArr) {
        return sortedArr;
      }
      joinArr.forEach((elem) => {
        joinObj[elem.name] = {
          location: elem.location,
          image: elem.image,
        };
      });

      sortedArr.forEach((elem) => {
        if (joinObj[elem.owner]) {
          elem.location = joinObj[elem.owner].location.toLowerCase();
          elem.image = joinObj[elem.owner].image;
        }
      });

      return sortedArr || [];
    };

    const getBlockData = () => {
      setLoading(true)
      Promise.all([
        getTableRows("amax", "producers", 1000),
        getTableRows("amax", "global", 1),
      ])
        .then((results: any[]) => {
          console.log(4848);

          const totalProducerVoteWeight = Number(results[1].rows[0].total_producer_vote_weight);
          const bpJson = [];

          console.log(bpJson,'bpJsonbpJsonbpJsonbpJson');

          createTable(results[0], totalProducerVoteWeight, bpJson);

          if (length) {

            socket.on("producers", (data: any) => {
              // console.log(data,'producers');
              if (!data) return;

              createTable(data, totalProducerVoteWeight, bpJson);
            });
          }
          setLoading(false)
        })
        .catch((err) => {
          console.log('promise 失败');

        });
    };
    getBlockData();
  }, [length]);


  useEffect(() => {
    const initData = async () => {
      socket.on('get_tps_blocks', (res: any) => {
        setCurProducer(res[0].producer)
      });
    }
    void initData();
    return () => {
      socket.close();
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <Spin spinning={loading}  tip="Loading...">
      <table className="producer-list-table">
        <tbody>
          <tr className="producer-list-table-header">
            <td style={{ textAlign: "center",width:'40px' }}>排名</td>
            {/* <td style={{ textAlign: "center" }}>图标</td> */}
            <td style={{ textAlign: "center" }}>节点账号</td>
            {/* <td style={{ textAlign: "center" }}>完整名称</td> */}
            <td style={{ textAlign: "center" }}>状态</td>
            <td style={{ textAlign: "center" }}>票数</td>
            <td>每日奖励</td>
          </tr>

          {list &&
            list.map((item, i) => {
              return (
                <tr
                  key={i}
                >
                  <td style={{ textAlign: "center" }} >{ item?.index }</td>
                  {/* <td style={{ textAlign: "center" }}>
                    <img src={node_icon} alt="" />
                  </td> */}
                  <td style={{ textAlign: "center" }} >
                    <span  className="pointer main-color" onClick={() => {
                    history.push(`/producer-detail/${item?.owner}`);
                  }}>{item?.owner}</span>
                    {item?.url && <img src={url_icon} className="pointer" style={{width:'14px',marginLeft:'10px'}} alt="" onClick={()=>{window.open(item?.url)}} />}
                  </td>
                  {/* <td style={{ textAlign: "center" }}>Newdex</td> */}
                  <td style={{ textAlign: "center" }}>
                    <div className={`tag${curProducer === item.owner ? ' s-blue':''}`}>{curProducer === item.owner ? '正在生产':'主节点'}</div>
                  </td>
                  <td
                    style={{ textAlign: "center" }}
                    className="number-font"
                    width={240}
                  >
                    {item?.all_votes} <span className="text-gray">({item?.rate}%)</span>
                    &nbsp;&nbsp;&nbsp;
                    {/* <span className="text-orange">
                      -2.1K&nbsp;&nbsp;&nbsp;↑
                    </span> */}
                  </td>
                  <td>
                    <span className="number-font">{ item?.rewards } AMAX</span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </Spin>
    </div>
  );
};

export default memo(ProducerTable);
