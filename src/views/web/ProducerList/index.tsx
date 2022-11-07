import { FC, memo, ReactElement, useEffect, useState } from "react";
import Baseweb from "@/components/baseContainer/webwrap";
import "./index.scss";
import ProducerTable from "@/components/ProducerTable";
import ServerApi from "@/api";
import { sortArray } from "@/utils/index";
import io from 'socket.io-client';
const { getTableRows, getProducersBpJson } = ServerApi;
const ProducerListPage: FC = (): ReactElement => {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    const ioOptions = {
        transports: ['websocket', 'polling'],
    }
    const socket = io('https://amaxscan.io', ioOptions);
    let votesToRemove
    const createTable = (table: any, totalVotes: number, bpJson: any) => {
      const mainData = table.rows;
      const _data =
      joinOtherProducerInfo(
        countRate(sortArray(mainData), totalVotes),
        bpJson
      )
      setList(_data);
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
      Promise.all([
        getTableRows("amax", "producers", 1000),
        getTableRows("amax", "global", 1),
        getProducersBpJson(),
      ])
        .then((results: any[]) => {
          const totalProducerVoteWeight = Number(results[1].rows[0].total_producer_vote_weight);
          const bpJson = results[1];
          createTable(results[0], totalProducerVoteWeight, bpJson);

          socket.on("producers", (data: any) => {
            if (!data) return;
            createTable(data, totalProducerVoteWeight, bpJson);
          });
        })
        .catch((err) => {});
    };
    getBlockData();
  }, []);

  return (
    <div className="section-box">
      <ProducerTable showPage={true} data={list} />
    </div>
  );
};

export default Baseweb(memo(ProducerListPage));
