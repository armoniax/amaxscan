import React, {memo} from 'react'
import Icon from "@/components/Icon";
import header_logo from "@/assets/images/web/header_logo.png";
import {Link, NavLink} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {languages} from '@/locale'
import {StorageHelper} from "@/utils/storage";

interface IWebHeaderProps {
    pagename?: string
}

const WebHeader: React.FunctionComponent<IWebHeaderProps> = (props) => {
    const {i18n, t} = useTranslation()
    const navList: any[] = [
        {
            path: '/',
            title: 'home'
        },
        {
            path: '/producer-list',
            title: 'nodes'
        },
        {
          path: '/blocks',
          title: 'blocks'
      },
        {
            path: '/transactions',
            title: 'transactions'
        },
        {
            path: '/tokens',
            title: 'tokens'
        }
    ]
    const changeLang = (code: string): void => {
        StorageHelper.setItem('lange', code)
        i18n.changeLanguage(code).catch(() => {
        })
    }
    return (
        <header className="web-header flex-row-between-center">
            <Link to="/">
                <Icon src={header_logo} height="32px"></Icon>
            </Link>
            <div className='flex-row-end-center'>
                <div className="nav flex-row-end-center">
                    {
                        navList.map(navItem => {
                            return (
                                <NavLink className='nav-item' activeClassName="current" to={navItem.path} exact
                                         key={navItem.title}>
                                    {t(`common.header.nav.${navItem.title}`, navItem.title)}
                                </NavLink>
                            )
                        })
                    }
                </div>
                <div className='select-box flex-row-center-center web-header-nav-dropdown m-l-26'>
                    <p>{languages && languages.find(i => i.value === i18n.language)?.label}</p>
                    <div className='arrow-down'></div>
                    <div className="web-header-nav-dropdown-menu">
                        <ul className="c-fff p-10-0">
                            {
                                languages.map(({label, value}) => {
                                    return (
                                        <li onClick={() => changeLang(value)} key={value}>{label}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className='select-box m-l-10 flex-row-center-center'>
                    <p>主网</p>
                    <div className='arrow-down'></div>
                </div>
            </div>
        </header>
    )
}

export default memo(WebHeader)
