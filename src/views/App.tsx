import React, {FC, lazy, Suspense} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'

import AutoScorllTop from '@/components/ScrollToTop/index'
import Loading from "@/components/Loading";
import routerConfig from "@/config/route";

const NotFound404 = lazy(async () => await import('./NotFound404'))
const App: FC = () => {
    // const {isMobile} = (window as any)._global || {}
    // useEffect(() => {
    //     window.addEventListener('scroll', () => {
    //         const scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    //         if (document.getElementsByClassName(isMobile ? 'mp-header' : 'web-header')[0].classList) {
    //             scrollT > 120 ? document.getElementsByClassName(isMobile ? 'mp-header' : 'web-header')[0].classList.add('showback') : document.getElementsByClassName(isMobile ? 'mp-header' : 'web-header')[0].classList.remove('showback')
    //         }

    //     })
    //     return () => {
    //         window.removeEventListener('scroll', () => {
    //             console.log(1222);
    //         })
    //     }
    // }, [isMobile])
    return (
        <Suspense fallback={<Loading/>}>
            <BrowserRouter>
                <AutoScorllTop>
                    <Switch>
                        {
                            routerConfig.map((item, index) => {
                                return (
                                    item.component ?
                                        <Route path={item.path} exact={item.exact} component={item.component}
                                               key={`pc${index}${item.path}`}></Route> : null
                                )
                            })
                        }
                        {
                            routerConfig.map((item, index) => {
                                return (
                                    item.mpComponent ?
                                        <Route path={`/m${item.path}`} exact={item.exact} component={item.mpComponent}
                                               key={`mobile${index}${item.path}`}></Route> : null
                                )
                            })
                        }
                        <Route component={NotFound404}></Route>
                    </Switch>
                </AutoScorllTop>
            </BrowserRouter>
        </Suspense>
    )
}

export default App
