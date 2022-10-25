import React, {memo, useState} from 'react'
import Icon from "@/components/Icon";
import icon_nav from '@/assets/images/mp/icon_nav.png'
import nav_dark_icon from '@/assets/images/mp/nav_dark_icon.png'
import nav_light_icon from '@/assets/images/mp/nav_light_icon.png'
import {Link} from "react-router-dom";
import header_logo from "@/assets/images/web/header_logo.png";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "@/state";
import {getUserInfo} from "@/state/base/reducer";
import ConnectModal from "@/components/ConnectModal";
import {isAPLink} from "@/utils/client";

interface IMpHeaderProps {
    pagename?: string
}

const MpHeader: React.FunctionComponent<IMpHeaderProps> = (props) => {
    const {account} = useSelector((state: AppState) => state.baseInfo)
    const dispatch = useDispatch();
    const [showDarkIcon, setShowDarkIcon] = useState<boolean>(false)
    const [connectVisible, setConnectVisible] = useState(false)
    const handleDarkTheme = () => {
        const bodyContent = document.querySelector('body')
        if (Array.from(bodyContent.classList).indexOf('dark') !== -1){
            setShowDarkIcon(true)
            bodyContent.classList.remove('dark')

        }else{
            setShowDarkIcon(false)
            bodyContent.classList.add('dark')
        }
    }

    const connectWallt = (connectorType:any) => {
        dispatch(getUserInfo(connectorType));
    }

    const handleConnect = ()=> {
        if (isAPLink) {
            dispatch(getUserInfo('Scatter'));
        }else{
            setConnectVisible(true)
        }
    }
    return (
        <>
            <header className="mp-header flex-row-between-center">
                <Link to="/">
                    <Icon src={header_logo} height="0.4rem"></Icon>
                </Link>
                {account.name?account.name:<p onClick={()=>handleConnect()}>登录</p>}
                <div className='flex-row-center-end'>
                    <Icon src={showDarkIcon?nav_dark_icon:nav_light_icon} height="0.48rem" className='m-r-20'
                          onClick={() => handleDarkTheme()}></Icon>
                    <Icon src={icon_nav} height="0.4rem"></Icon>

                </div>
            </header>
            <ConnectModal visible={connectVisible} login={(connectorType:any)=>connectWallt(connectorType)} onDismiss={() => setConnectVisible(false)} />
        </>
    )
}

export default memo(MpHeader)
