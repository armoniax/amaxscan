import React, {memo, useState} from 'react'
import Icon from "@/components/Icon";
import header_logo from "@/assets/images/web/header_logo.png";
import search_icon from "@/assets/images/web/search_icon.png";
import {Link, NavLink, useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {languages} from '@/locale'
import {StorageHelper} from "@/utils/storage";
import { searchByInsert } from '@/utils';

interface IWebHeaderProps {
    pagename?: string
}

const WebHeader: React.FunctionComponent<IWebHeaderProps> = (props) => {
    const history = useHistory()

    const [searchWords,setSearchWords] = useState('')
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
          path: '/block-list',
          title: 'blocks'
      },
        {
            path: '/transaction-list',
            title: 'transactions'
        },
        {
            path: '/token-list',
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
                {
                  history?.location?.pathname !== '/' &&
                  <div className='search-bar'>
                    <input type="text" placeholder='搜索账号/交易哈希/区块编号' onInput={(e:any)=>{
                      setSearchWords(e.target.value)
                    }} />
                    <img src={search_icon} className="icon pointer" alt="" onClick={()=>{
                      searchByInsert(searchWords,history)
                    }} />
                  </div>
                }
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
