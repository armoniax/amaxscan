import {FC, memo, ReactElement} from 'react'
import Baseweb from '@/components/baseContainer/webwrap'
import './index.scss'
import ProducerList from '@/components/ProducerList'

const ProducerListPage: FC = (): ReactElement => {
    const list = []
    for (let i = 0; i < 40; i++) {
      list.push(i)
    }
    return (
      <ProducerList showPage={true} data={list} />
    )
}

export default Baseweb(memo(ProducerListPage))
