import {FC, memo, ReactElement} from 'react'
import Baseweb from '@/components/baseContainer/webwrap'
import './index.scss'

const publicKeyList: FC = (): ReactElement => {
    const list = []
    for (let i = 0; i < 20; i++) {
      list.push('odi@nomeg.sc')

    }
    return (
      <div className='public-key-list section-box'>
        <div className='section-box-header'>
          <p className='title'>公钥（Public Key）</p>
        </div>
        <p className='current-key'>Key： <span className='c-909399'>PUB_K1_55csjge6LNnLxECFTtTpCU6Z7chi3h47G8vyzPBjAKdvZmnZ8Z</span> </p>
        <div className='fs-18 c-303333'>账户</div>
        <div className='account-list'>
          {
            list.map((item,i)=>{
              return(
                <div className='account-list-item' key={i}>{item}</div>
              )
            })
          }

        </div>
      </div>
    )
}

export default Baseweb(memo(publicKeyList))
