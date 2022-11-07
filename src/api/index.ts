import {nameToNumeric} from '@/utils'
import {getClient, getContract} from '@/utils/client'
import axiosRequest from '@/api/axiosRequest'

const {post,get} = axiosRequest

class ServerApi {
    private readonly baseConfig = {
        amaxNodeApi: `${process.env.REACT_APP_URL}/v1/chain/get_table_rows`,
        amaxScanApi:`${process.env.REACT_APP_AMAX_SCAN}/api/v1`,
    }

    getLastBlocksData = async (size)=>{
        const data = await get(`${this.baseConfig.amaxScanApi}/get_last_blocks/${size}`, {})
        return data
    }
    getTableRowsByVendorinfo = async () => {
        const data = await post(this.baseConfig.amaxNodeApi, {
            code: process.env.REACT_APP_CONTARCT_NAME,
            scope: process.env.REACT_APP_CONTARCT_NAME,
            table: 'vendorinfo',

            json: true
        })
        return data
    }

    getTableRowsByNFT = async (accountName: any) => {
        const responseData = await post(this.baseConfig.amaxNodeApi, {
            code: process.env.REACT_APP_CONTARCT_NFT_NAME,
            scope: nameToNumeric(accountName),
            table: 'accounts',
            json: true
        })
        return responseData
    }

    getTableRowsByOrders = async (accountName: any) => {
        console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSS',process.env.REACT_APP_CENTRALIZED_API)
        const responseData = await post(this.baseConfig.amaxNodeApi, {
            code: process.env.REACT_APP_CONTARCT_NAME,
            scope: process.env.REACT_APP_CONTARCT_NAME,
            table: 'orders',
            index_position: 2,
            key_type: 'i64',
            lower_bound: nameToNumeric(accountName),
            upper_bound: nameToNumeric(accountName),
            json: true
        })
        return responseData
    }

    getUserBalance = async (accountName: any, symbol: any) => {
        const client = await getClient()
        let banlance = await client.getCurrencyBalance(
            process.env.REACT_APP_TOKEN_NAME,
            accountName,
            symbol
        )
        try {
            banlance = banlance[0].split(' ')[0] || ''
        } catch (error) {
            banlance = '0'
        }
        return banlance
    }

    transferFee = async (accountName: any, userChargeAmount: any, memo: any) => {
        const contract = await getContract(process.env.REACT_APP_TOKEN_NAME)
        return contract.transfer(accountName, process.env.REACT_APP_CONTARCT_NAME, userChargeAmount, memo)
    }
}

export default new ServerApi()
