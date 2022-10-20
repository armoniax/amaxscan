import React, {FC, memo, ReactElement, useCallback, useState} from 'react'
import Baseweb from '@/components/baseContainer/webwrap'
import {useTranslation} from 'react-i18next'
import Icon from "@/components/Icon";
import icon_search from "@/assets/images/mp/icon_search.png";
import cur_block from "@/assets/images/web/cur_block.png";
import nodes from "@/assets/images/web/nodes.png";
import forward from "@/assets/images/web/forward.png";
import latest_block from "@/assets/images/web/latest_block.png";
import fresh_sign from "@/assets/images/web/fresh_sign.png";
import status from "@/assets/images/web/status.png";
import amax_logo from "@/assets/images/web/amax_logo.png";
import rise_icon_green from "@/assets/images/web/rise_icon_green.png";
import rise_icon_red from "@/assets/images/web/rise_icon_red.png";
import amax_banner from "@/assets/images/web/amax_banner.png";
import curve_banner from "@/assets/images/mp/curve_banner.png";
import icon_arrow_right from "@/assets/images/mp/icon_arrow_right.png";
import node_icon from "@/assets/images/web/node_icon.png";

import './index.scss'

const Home: FC = (): ReactElement => {
    const {t} = useTranslation()
    const [cur, setCur] = useState(0)
    const tabList = ['CNYD', 'APL']
    const [inputVal, setInputVal] = useState<string>('')
    const inputChange = useCallback(
        (e) => {
            const value = e?.target?.value ?? ''
            setInputVal(value)
        },
        []
    )
    return (
        <div className='home-container'>
            <div className='input-external flex-row-start-center'>
                <Icon src={icon_search} height="0.4rem"></Icon>
                <input value={inputVal} onChange={inputChange} placeholder="搜索账号/交易哈希/区块编号"/>
            </div>
            <div className='card-bg m-t-12'>
                <div className='flex-row-between-center'>
                    <div className='flex-row-start-center'>
                        <Icon src={cur_block} height="0.72rem"></Icon>
                        <p className='m-l-12 fs-14 c-606266'>当前区块</p>
                    </div>
                    <p className='fs-18 c-313131 fw-600'>3764565</p>
                </div>
                <div className='flex-row-between-center fs-10 c-909399 m-t-10'>
                    <div className='flex-row-between-center w-40'>
                        <p>每秒处理交易</p>
                        <p className='fw-bold c-50BF8C m-l-40'>56</p>
                    </div>
                    <div className='flex-row-between-center w-40'>
                        <p>每秒处理交易</p>
                        <p className='fw-bold c-50BF8C m-l-40'>86</p>
                    </div>
                </div>
                <div className='flex-row-between-center fs-10 c-909399 m-t-10'>
                    <div className='flex-row-between-center w-40'>
                        <p>历史最高</p>
                        <p className='fw-bold c-FA454B m-l-40'>3782</p>
                    </div>
                    <div className='flex-row-between-center w-40'>
                        <p>历史最高</p>
                        <p className='fw-bold c-FA454B m-l-40'>8782</p>
                    </div>
                </div>
                <div className='card-line m-t-12 m-b-12'></div>
                <div className='flex-row-start-center'>
                    <Icon src={nodes} height="0.72rem"></Icon>
                    <p className='m-l-12 fs-14 c-606266'>生产点</p>
                </div>
                <div className='flex-row-between-center fs-10 c-909399 m-t-8'>
                    <p>每秒处理交易</p>
                    <p>下一个生产点</p>
                </div>
                <div className='flex-row-between-center fs-18 c-313131 m-t-8 fw-600'>
                    <p>Armonia1</p>
                    <Icon src={forward} height="0.32rem"></Icon>
                    <p>Armonia2</p>
                </div>
                <div className='card-line m-t-12 m-b-12'></div>

                <div className='flex-row-start-center'>
                    <Icon src={latest_block} height="0.72rem"></Icon>
                    <p className='m-l-12 fs-14 c-606266'>最新不可逆区块</p>
                </div>
                <div className='flex-row-between-center fs-10 fw-600 c-313131 m-t-8'>
                    <Icon src={fresh_sign} height="0.4rem"></Icon>
                    <p>Armonia2</p>
                </div>
                <div className='card-line m-t-12 m-b-12'></div>
                <div className='flex-row-start-center'>
                    <Icon src={status} height="0.72rem"></Icon>
                    <p className='m-l-12 fs-14 c-606266'>实时状况</p>
                </div>

                <div className='flex-row-between-center fs-10 c-909399 m-t-12'>
                    <p>CPU上限<span className='m-l-8 c-50BF8C fw-bold'>0.200s/0.200s</span></p>
                    <p>内存RAM <span className='m-l-8 c-F5B84A fw-bold'>3/28GB</span></p>
                </div>

                <p className='c-909399 fs-10 m-t-12 m-b-12'>NET带宽上限<span className='m-l-8 c-60BAEC fw-bold'>1024 KB/1000 MB</span>
                </p>
            </div>

            <div className='card-bg m-t-16'>
                <div className='flex-row-between-center'>
                    <Icon src={amax_logo} height="0.78rem"></Icon>
                    <div>
                        <div className='flex-row-end-center'>
                            <p className='m-r-4 fs-14 c-50BF8C fw-bold'>1.43%</p> <Icon src={rise_icon_green}
                                                                                        height="0.48rem"></Icon>
                        </div>
                        <p className='c-313131 fs-14 fw-bold m-t-12'>$2.591<span
                            className='c-909399 fs-10 fw-normal'>/USD</span></p>
                    </div>
                </div>
                <div className='fs-10 c-909399 m-t-24'>
                    <div className='flex-row-between-center'>
                        <p>AMAX总供应量</p>
                        <p className='fs-12'><span className='c-303332 fs-14 fw-bold'>347364328947237</span>/AMAX</p>
                    </div>
                    <div className='flex-row-between-center m-t-26'>
                        <p>已投票</p>
                        <p className='fs-12'><span className='c-303332 fs-14 fw-bold'>347947237</span>/AMAX</p>
                    </div>
                    <div className='flex-row-between-center m-t-26'>
                        <p>已质押</p>
                        <p className='fs-12'><span className='c-303332 fs-14 fw-bold'>347947237</span>/AMAX</p>
                    </div>

                    <Icon src={amax_banner} className='m-t-16' width="100%"></Icon>

                    <div className='flex-row-between-center m-t-18 m-b-4'>
                        <p>当前内存价格</p>
                        <p className='fs-12'><span className='c-303332 fs-14 fw-bold'>0.00335</span>/AMAX</p>
                    </div>

                </div>

            </div>

            <div className='card-bg m-t-16'>
                <div className="m-tabs flex-row-start-center">
                    {
                        tabList.map((item, i) => {
                            return (
                                <div className={`tab ${cur === i ? 'z-cur' : ""}`} onClick={() => {
                                    setCur(i)
                                }}>{item}</div>
                            )
                        })
                    }
                </div>

                <div className='flex-row-between-center m-b-12'>
                    <div>
                        <p className='fs-10 c-909399'>总市值 USD</p>
                        <p className='c-303332 fs-18 fw-bold m-t-12'>3476782197</p>
                    </div>
                    <div className='flex-row-center-center'>
                        <p className='fs-14 c-FA454B fw-bold'>2%</p> <Icon src={rise_icon_red} height="0.24rem"></Icon>
                    </div>
                    <Icon src={curve_banner} height="1.8rem"></Icon>

                </div>
            </div>

            <div className='flex-row-between-center m-t-16 m-b-8'>
                <p className='fs-18 c-303332 fw-bold'>最新区块</p>
                <div className='flex-row-end-center fs-12 c-909399'>
                    <p className='m-r-6'>更多区块</p>
                    <Icon src={icon_arrow_right} height="0.24rem"></Icon>
                </div>
            </div>

            <div className='flex-row-between-center overflow-scroll'>
                <div className='block-card'>
                    <div className='flex-row-between-center time'>
                        <p className='fs-18 c-303332'>#3762039</p>
                        <p className='fs-12 c-909399'>2022-10-08 15:20:01</p>
                    </div>
                    <div className='flex-row-between-center m-t-16'>
                        <p className=' btn fs-12 c-303332'>AMAXyreywr</p>
                        <p className='fs-12 c-303332'>交易<span className='c-50BF8C'>8</span>笔</p>
                    </div>
                </div>
                <div className='block-card m-l-12'>
                    <div className='flex-row-between-center time'>
                        <p className='fs-18 c-303332'>#3762039</p>
                        <p className='fs-12 c-909399'>2022-10-08 15:20:01</p>
                    </div>
                    <div className='flex-row-between-center m-t-16'>
                        <p className=' btn fs-12 c-303332'>AMAXyreywr</p>
                        <p className='fs-12 c-303332'>交易<span className='c-50BF8C'>8</span>笔</p>
                    </div>
                </div>
            </div>

            <div className='flex-row-between-center m-t-16 m-b-8'>
                <p className='fs-18 c-303332 fw-bold'>最新交易</p>
                <div className='flex-row-end-center fs-12 c-909399'>
                    <p className='m-r-6'>更多交易</p>
                    <Icon src={icon_arrow_right} height="0.24rem"></Icon>
                </div>
            </div>
            <div className='card-bg m-t-16'>
                <div className='flex-row-between-center fs-14 c-303332 fw-600 m-t-18'>
                    <p>Transaction ID</p>
                    <p>Block Number</p>
                </div>
                <div className='card-line m-t-12'></div>

                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p>fd838b517b17dsadfsa3</p>
                    <p>240706426</p>
                </div>
                <div className='card-line'></div>
                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p>fd838b517b17dsadfsa3</p>
                    <p>240706426</p>
                </div>
                <div className='card-line'></div>
                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p>fd838b517b17dsadfsa3</p>
                    <p>240706426</p>
                </div>
                <div className='card-line'></div>
                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p>fd838b517b17dsadfsa3</p>
                    <p>240706426</p>
                </div>
                <div className='card-line'></div>
                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p>fd838b517b17dsadfsa3</p>
                    <p>240706426</p>
                </div>
                <div className='card-line'></div>
                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p>fd838b517b17dsadfsa3</p>
                    <p>240706426</p>
                </div>
            </div>

            <div className='flex-row-between-center m-t-16 m-b-8'>
                <p className='fs-18 c-303332 fw-bold'>生产节点</p>
                <div className='flex-row-end-center fs-12 c-909399'>
                    <p className='m-r-6'>更多节点</p>
                    <Icon src={icon_arrow_right} height="0.24rem"></Icon>
                </div>
            </div>

            <div className='card-bg m-t-16'>
                <div className='flex-row-between-center fs-14 c-303332 fw-600 m-t-18'>
                    <p className='w-20'>排名</p>
                    <p className='w-20 t-center'>图标</p>
                    <p className='w-30 t-right'>节点账号</p>
                    <p className='w-30 t-right'>完整名称</p>
                </div>
                <div className='card-line m-t-12'></div>

                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p className='w-20'>1</p>
                    <div className='w-20 t-center'>
                        <Icon  src={node_icon} height="0.9rem"></Icon>
                    </div>

                    <p className='w-30 t-right'>newdex.bp</p>
                    <p className='w-30 t-right'>Newdex</p>
                </div>
                <div className='card-line'></div>
                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p className='w-20'>2</p>
                    <div className='w-20 t-center'>
                        <Icon  src={node_icon} height="0.9rem"></Icon>
                    </div>

                    <p className='w-30 t-right'>newdex.bp</p>
                    <p className='w-30 t-right'>Newdex</p>
                </div>
                <div className='card-line'></div>
                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p className='w-20'>3</p>
                    <div className='w-20 t-center'>
                        <Icon  src={node_icon} height="0.9rem"></Icon>
                    </div>

                    <p className='w-30 t-right'>newdex.bp</p>
                    <p className='w-30 t-right'>Newdex</p>
                </div>
                <div className='card-line'></div>
                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p className='w-20'>4</p>
                    <div className='w-20 t-center'>
                        <Icon  src={node_icon} height="0.9rem"></Icon>
                    </div>

                    <p className='w-30 t-right'>newdex.bp</p>
                    <p className='w-30 t-right'>Newdex</p>
                </div>
                <div className='card-line'></div>
                <div className='flex-row-between-center fs-14 c-303332 m-t-20 m-b-20'>
                    <p className='w-20'>5</p>
                    <div className='w-20 t-center'>
                        <Icon  src={node_icon} height="0.9rem"></Icon>
                    </div>

                    <p className='w-30 t-right'>newdex.bp</p>
                    <p className='w-30 t-right'>Newdex</p>
                </div>

            </div>
        </div>
    )
}

export default Baseweb(memo(Home))
