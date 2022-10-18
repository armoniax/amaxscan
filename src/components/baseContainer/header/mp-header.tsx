import React, {memo} from 'react'
import Icon from "@/components/Icon";
import icon_nav from '@/assets/images/mp/icon_nav.png'
import {Link} from "react-router-dom";
import header_logo from "@/assets/images/web/header_logo.png";

interface IMpHeaderProps {
    pagename?: string
}

const MpHeader: React.FunctionComponent<IMpHeaderProps> = (props) => {

    return (
        <>
            <header className="mp-header flex-row-between-center">
                <Link to="/">
                    <Icon src={header_logo} height="0.4rem"></Icon>
                </Link>
                <div className='flex-row-center-end'>
                    <Icon src={icon_nav} height="0.4rem"></Icon>
                </div>
            </header>
        </>
    )
}

export default memo(MpHeader)
