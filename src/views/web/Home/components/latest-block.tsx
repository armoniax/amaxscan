import {FC, memo, ReactElement, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ServerApi from '@/api'
import "../index.scss";
import BlockList from "@/components/BlockList";
import io from 'socket.io-client';


const LatestBlock: FC = (): ReactElement => {


    const [latestBlockList, setLatestBlockList] = useState<any[]>([])
    const {
        getLastBlocksData
    } = ServerApi
    useEffect(() => {
        const ioOptions = {
            transports: ['websocket', 'polling'],
        }
        const socket = io('https://amaxscan.io', ioOptions);
        socket.on('get_info', (res: any) => {
            console.log('get_info', res);
        });
        socket.on('users_online', (res: any) => {
            console.log('users_online', res);
        });

        socket.on('get_tps_blocks', (res: any) => {
            console.log('get_tps_blocks', res.length, res);

        });
        socket.on('get_last_blocks', (res: any) => {
            console.log('get_last_blocks', res);
        });
        socket.on('get_aggregation', (res: any) => {
            console.log('get_aggregation', res);
        });
    }, [])
    useEffect(() => {
        const initData = async () => {
            // socket.connect()
            // socket.on('get_last_blocks',function (params) {
            //     console.log(params)
            // })
            // console.log('resresresres',socket);
            // socket.on('connect', (...args) => {
            //     console.log('resresresres',args);
            //     // state.blocks = sortArray(res);
            //     // state.txns = createTransactionsArray(res);
            // });

            // socket.on("connect", () => {
            //     const engine = socket.io.engine;
            //     engine.on("packet", ({type, data}) => {
            //         console.log(type, data)
            //         // called for each packet received
            //     });
            //     console.log(socket.id); // "G5p5..."
            // });


            const responseData = await getLastBlocksData(6)
            setLatestBlockList(responseData)


        }
        void initData()
    }, [getLastBlocksData])

    return (
        <div className="latest-block section-box">
            <div className="section-box-header flex-row-between-center">
                <p className="title">最新区块</p>
                <Link to={{pathname: '/block-list'}} className="flex-row-start-center">更多区块 <i
                    className="arrow-icon"></i></Link>
            </div>
            <BlockList data={latestBlockList}/>
        </div>
    );
};

export default memo(LatestBlock);
