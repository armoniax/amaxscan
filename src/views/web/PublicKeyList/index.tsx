import {FC, memo, ReactElement} from 'react'
import Baseweb from '@/components/baseContainer/webwrap'
import './index.scss'

const publicKeyList: FC = (): ReactElement => {
    return (
      <div></div>
    )
}

export default Baseweb(memo(publicKeyList))
