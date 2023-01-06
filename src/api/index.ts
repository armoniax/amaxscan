import {nameToNumeric} from '@/utils'
import {getClient, getContract} from '@/utils/client'
import axiosRequest from '@/api/axiosRequest'
export interface GetCurrencyBalanceParams {
  tokenContract: string,
  account: string | number,
  tokenSymbol: string | number
}


const {post,get} = axiosRequest

class ServerApi {
    private readonly baseConfig = {
        amaxNodeApi: `${process.env.REACT_APP_URL}/v1/chain/get_table_rows`,
        amaxScanApi:`${process.env.REACT_APP_AMAX_SCAN}/api`,
        amaxScanProApi:`https://amaxscan.io/api`,
    }

    getLastBlocksData = async (size:number)=>{
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/get_last_blocks/${size}`, {})
      return data
    }

    getOverview = async ()=>{
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/pg/getstats`, {})
      return data
    }

    getTotalSupply = async ()=>{
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/get_table_rows/amax.token/AMAX/stat/10`, {})
      return data
    }

    getTotalPledge = async ()=>{
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/pg/get/pledgePrice`, {})
      return data
    }

    getNFTByScope = async (account:string,page:number)=>{
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/pg/getNFTByScope/${account}/15/${page}`, {})
      return data
    }

    getTokenList = async (_data:object)=>{
      const data = await post(`${this.baseConfig.amaxScanApi}/v1/pg/get/tokens`, _data)
      return data
    }

    getCoinDetail = async (code:string,coin:string)=>{
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/pg/get/tokenBycode/${code}/${coin}`, {})
      return data
    }

    getAccountListByToken = async (params:object)=>{
      const data = await get(`${this.baseConfig.amaxScanProApi}/stats/account/list`, params)
      return data
    }

    getTokenByScope = async (account:string)=>{
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/pg/getTokenByScope/${account}`, {})
      return data
    }

    getNFTBySymbolId = async (account:string,id:string)=>{
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/pg/getNFTBySymbolId/${account}/${id}`, {})
      return data
    }

    getBlockDetail = async (id:string)=>{
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/get_block/${id}`, {})
      return data
    }

    getTransactionData = async (id:string)=>{
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/get_transaction/${id}`, {})
      return data
    }
    getTableRows = async(accountName: string, name: string, count = 20) =>{
      const data = await  get(`${this.baseConfig.amaxScanApi}/v1/get_table_rows/${accountName}/${accountName}/${name}/${count}`)
      return data
    };
    getProducersBpJson = async() => {
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/get_producers_bp_json`)
      return data
    };

    getAccountDetail = async (account: string) => {
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/get_account/${account}`)
      return data
    };

    searchBy = async(text: string) => {
      const data = await post(`${this.baseConfig.amaxScanApi}/v1/search`, { text: text.replace(/ /g, '') })
      return data
    };

    getCurrencyBalance = async(params: GetCurrencyBalanceParams) => {
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/get_currency_balance/${params.tokenContract}/${params.account}/${params.tokenSymbol}`);
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

    getAccountByCreator = async({ creator, pageIndex, pageSize }) => {
      const data = await get(`${this.baseConfig.amaxScanProApi}/stats/account/listbyceator?creator=${creator}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
      return data
    }
    getKeyAccounts = async(pubkey:string) => {
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/get_accounts_by_authorizers/${pubkey}`);
      return data
    }
    getActionsByAccount = async(accountName:string,pos: number, elementsLimit: number) => {
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/get_actions/${accountName}/${pos}/-${elementsLimit}`);
      return data
    }

    getCode = async(accountName:string) => {
      const data = await get(`${this.baseConfig.amaxScanApi}/v1/get_code/${accountName}`);
      return data
    }


}

export default new ServerApi()
