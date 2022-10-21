import React, {memo, useState} from 'react'
import Icon from "@/components/Icon";
import icon_nav from '@/assets/images/mp/icon_nav.png'
import nav_dark_icon from '@/assets/images/mp/nav_dark_icon.png'
import nav_light_icon from '@/assets/images/mp/nav_light_icon.png'
import {Link} from "react-router-dom";
import header_logo from "@/assets/images/web/header_logo.png";

interface IMpHeaderProps {
    pagename?: string
}

const MpHeader: React.FunctionComponent<IMpHeaderProps> = (props) => {
    const [showDarkIcon, setShowDarkIcon] = useState<boolean>(false)
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
    return (
        <>
            <header className="mp-header flex-row-between-center">
                <Link to="/">
                    <Icon src={header_logo} height="0.4rem"></Icon>
                </Link>
                <div className='flex-row-center-end'>
                    <Icon src={showDarkIcon?nav_dark_icon:nav_light_icon} height="0.48rem" className='m-r-20'
                          onClick={() => handleDarkTheme()}></Icon>
                    <Icon src={icon_nav} height="0.4rem"></Icon>

                </div>
            </header>
        </>
    )
}

export default memo(MpHeader)
