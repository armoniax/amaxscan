import {FC, memo, ReactElement} from 'react'
import Baseweb from '@/components/baseContainer/webwrap'
import node_icon from "@/assets/images/web/node_icon.png";
import './index.scss'

const NFTItem: FC = (): ReactElement => {

    return (
      <div className='nft-item'>
        <div className='section-box'>
          <div className='section-box-header'>
            <p className='title'>WAX Mainnet Launch Pin</p>
          </div>
          <div className='nft-item-main flex-row-between-center'>
            <div className='nft-info'>
              <div className='nft-info-item'>
                <span className='title'>持有者</span>
                <span className='ct s-green'>Louise Sullivan</span>
              </div>
              <div className='nft-info-item'>
                <span className='title'>作者</span>
                <span className='ct s-green'>waxpins</span>
              </div>
              <div className='nft-info-item'>
                <span className='title'>专辑</span>
                <span className='ct'>WAXPINS</span>
              </div>
              <div className='nft-info-item'>
                <span className='title'>AssetID</span>
                <span className='ct'>1099608412763</span>
              </div>
              <div className='nft-info-item'>
                <span className='title'>当前NFT编号</span>
                <span className='ct'>1595</span>
              </div>
              <div className='nft-info-item'>
                <span className='title'>全部发行量</span>
                <span className='ct'>1000000</span>
              </div>
            </div>
            <div className='nft-avatar'>
              <img src={node_icon} alt="" />
            </div>
          </div>
        </div>
        <div className='section-box'>
          <div className='section-box-header'>
            <p className='title'>Immutable</p>
          </div>
          <div className='immutable-info'>
            <div className='immutable-info-item'>
              <span className='title'>img：</span>
              <span className='ct'>PUB_K1_55csjge6LNnLxECFTtTpCU6Z7chi3h47G8vyzPBjAKdvZmnZ8Z</span>
            </div>
            <div className='immutable-info-item'>
              <span className='title'>name：</span>
              <span className='ct'>PUB_K1_55csjge6LNnLxECFTtTpCU6Z7chi3h47G8vyzPBjAKdvZmnZ8Z</span>
            </div>
            <div className='immutable-info-item'>
              <span className='title'>milestone：</span>
              <span className='ct'>PUB_K1_55csjge6LNnLxECFTtTpCU6Z7chi3h47G8vyzPBjAKdvZmnZ8Z</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Baseweb(memo(NFTItem))
