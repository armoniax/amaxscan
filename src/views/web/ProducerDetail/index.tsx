import {FC, memo, ReactElement} from 'react'
import Baseweb from '@/components/baseContainer/webwrap'
import './index.scss'


const ProducerDetail: FC = (): ReactElement => {
    return (
      <div>
       ProducerDetail
      </div>
    )
}

export default Baseweb(memo(ProducerDetail))
