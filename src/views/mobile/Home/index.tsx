import React, {FC, memo, ReactElement, useCallback, useState} from 'react'
import Baseweb from '@/components/baseContainer/webwrap'
import {useTranslation} from 'react-i18next'
import Icon from "@/components/Icon";
import icon_search from "@/assets/images/mp/icon_search.png";
import './index.scss'

const Home: FC = (): ReactElement => {
    const {t} = useTranslation()
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

        </div>
    )
}

export default Baseweb(memo(Home))
