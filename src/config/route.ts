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
    },
    {
      // 公钥列表
      path: '/publicKey-list',
      component: lazy(async () => await import('@/views/web/PublicKeyList/index')),
      mpComponent: lazy(async () => await import('@/views/mobile/PublicKeyList/index')),
      exact: true
    },
    {
      // 单个NFT详情
      path: '/nft-item',
      component: lazy(async () => await import('@/views/web/NFTItem/index')),
      mpComponent: lazy(async () => await import('@/views/mobile/NFTItem/index')),
      exact: true
    },
    {
      // 交易列表
      path: '/transaction-list',
      component: lazy(async () => await import('@/views/web/TransactionList/index')),
      mpComponent: lazy(async () => await import('@/views/mobile/TransactionList/index')),
      exact: true
    },
    {
      // 交易详情
      path: '/transaction-detail',
      component: lazy(async () => await import('@/views/web/TransactionDetail/index')),
      mpComponent: lazy(async () => await import('@/views/mobile/TransactionDetail/index')),
      exact: true
    },
    {
      // 区块列表
      path: '/block-list',
      component: lazy(async () => await import('@/views/web/BlockList/index')),
      mpComponent: lazy(async () => await import('@/views/mobile/BlockList/index')),
      exact: true
    },
    {
      // 区块详情
      path: '/block-detail/:block_num',
      component: lazy(async () => await import('@/views/web/BlockDetail/index')),
      mpComponent: lazy(async () => await import('@/views/mobile/BlockDetail/index')),
      exact: true
    },
    {
      // 代币列表
      path: '/token-list',
      component: lazy(async () => await import('@/views/web/TokenList/index')),
      mpComponent: lazy(async () => await import('@/views/mobile/TokenList/index')),
      exact: true
    },
    {
      // 代币详情
      path: '/token-detail',
      component: lazy(async () => await import('@/views/web/TokenDetail/index')),
      mpComponent: lazy(async () => await import('@/views/mobile/TokenDetail/index')),
      exact: true
    },
]

export default routerConfig
