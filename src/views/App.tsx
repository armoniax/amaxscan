import React, {FC, lazy, Suspense, useEffect} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Loading from "@/components/Loading";
import routerConfig from "@/config/route";

const NotFound404 = lazy(async () => await import('./NotFound404'))
const App: FC = () => {
  useEffect(() => {
    window.addEventListener('scroll', ()=>{
      const scrollT = document.documentElement.scrollTop || document.body.scrollTop;
      scrollT > 120 ? document.getElementsByClassName('web-header')[0].classList.add('showback') : document.getElementsByClassName('web-header')[0].classList.remove('showback')
    })
  }, [])
    return (
        <Suspense fallback={<Loading/>}>
            <BrowserRouter>
                <Switch>
                    {
                        routerConfig.map((item, index) => {
                            return (
                                item.component ? <Route path={item.path} exact={item.exact} component={item.component}
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
            </BrowserRouter>
        </Suspense>
    )
}

export default App
