import {FC, memo, ReactElement} from 'react'
import Baseweb from '@/components/baseContainer/webwrap'
import {useTranslation} from 'react-i18next'

const Home: FC = (): ReactElement => {
    const {t} = useTranslation()
    return (
        <div>
            <h1>
                {t('common.header.nav.home')}
            </h1>

        </div>
    )
}

export default Baseweb(memo(Home))
