import {FunctionComponent, lazy, LazyExoticComponent} from 'react'

interface IRouterConfig {
    path: string
    component: LazyExoticComponent<FunctionComponent<any>> | undefined
    mpComponent: LazyExoticComponent<FunctionComponent<any>> | undefined
    exact?: boolean
}

const routerConfig: IRouterConfig[] = [
    {
        // 首页
        path: '/',
        component: lazy(async () => await import('@/views/web/Home/index')),
        mpComponent: lazy(async () => await import('@/views/mobile/Home/index')),
        exact: true
    },
    {
      // 生产节点列表
      path: '/producer-list',
      component: lazy(async () => await import('@/views/web/ProducerList/index')),
      mpComponent: lazy(async () => await import('@/views/mobile/ProducerList/index')),
      exact: true
    },
    {
      // 生产节点详情
      path: '/producer-detail',
      component: lazy(async () => await import('@/views/web/ProducerDetail/index')),
      mpComponent: lazy(async () => await import('@/views/mobile/ProducerDetail/index')),
      exact: true
    }
]

export default routerConfig
