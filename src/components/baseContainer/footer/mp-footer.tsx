import React, {memo} from 'react'
import {Link} from "react-router-dom";
import Icon from "@/components/Icon";
import header_logo from "@/assets/images/web/header_logo.png";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMpFooterProps {
}

const MpFooter: React.FunctionComponent<IMpFooterProps> = (props) => {

    return (
        <footer className="mp-footer flex-row-between-center">
            <div>
                <Link to="/">
                    <Icon src={header_logo} height="0.35rem"></Icon>
                </Link>
                <p className='txt'>AMAX区块链浏览器</p>
            </div>
            <div className='flex-col-center-center c-9AA29E fs-12'>
                <a href='https://www.test.com' target='_blank'
                   rel='noreferrer'>官方网站</a>
                <a href='https://www.test.com' target='_blank'
                   rel='noreferrer' className='m-t-12'>联系我们</a>
                <a href='https://t.me/' target='_blank'
                   rel='noreferrer' className='m-t-12'>电报群</a>
            </div>
        </footer>
    )
}

export default memo(MpFooter)
