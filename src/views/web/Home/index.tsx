import {FC, memo, ReactElement} from 'react'
import Baseweb from '@/components/baseContainer/webwrap'
import {useTranslation} from 'react-i18next'
import './index.scss'
import Overview from './components/overview'
import LatestBlock from './components/latest-block'
import LatestTransaction from './components/latest-transaction'
import ProductionNodes from './components/production-nodes'


const Home: FC = (): ReactElement => {
    const {t} = useTranslation()
    return (
      <div>
        <div className="m-search-bar section-box">
          <input type="text" placeholder={t('home.searchPlace')} />
        </div>
        <Overview/>
        <LatestBlock />
        <LatestTransaction/>
        <ProductionNodes />
      </div>
    )
}

export default Baseweb(memo(Home))
