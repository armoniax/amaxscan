import Amax from '@amax/amaxjs'

let _getClient = null

console.log('chainId---', process.env.REACT_APP_NETWORK_chainId)

export const network = {
  blockchain: 'amax',
  expireInSeconds: 600,
  host: process.env.REACT_APP_NETWORK_host, // ( or null if endorsed chainId )
  port: process.env.REACT_APP_NETWORK_port, // ( or null if defaulting to 80 )
  chainId: process.env.REACT_APP_NETWORK_chainId, // Or null to fetch automatically ( takes longer )
  protocol: process.env.REACT_APP_NETWORK_protocol
}

const options = {
  broadcast: true,
  sign: true,
  expireInSeconds: 200,
  chainId: network.chainId
}

export async function getClient () {
  const isAPLink = window.navigator.userAgent
      .toLowerCase()
      .includes('aplink');
  console.log('aaaaaaaaaaaaaaa',isAPLink)
  // if (_getClient) return _getClient;
  const scatter = getScatter()
  if (scatter) {
    if (!(window as any).scatterAMAX) {
      const identity = await scatter.getIdentity({
        accounts: [{ chainId: network.chainId, blockchain: network.blockchain }]
      })

      const account = identity?.accounts[0];
      (window as any).scatterAMAX = scatter.amax(
        network,
        Amax,
        {
          ...options,
          authorization: [`${account.name}@${account.authority}`]
        },
        network.protocol
      )
    }
    _getClient = (window as any).scatterAMAX
    return _getClient
  }

  /**
     * 有些数据不需要连接钱包，也可以展示
     */
  if (!(window as any).AMAX) {
    (window as any).AMAX = Amax({
      httpEndpoint: `${network.protocol}://${network.host}`,
      chainId: network.chainId
    })
  }
  _getClient = (window as any).AMAX
  return _getClient
}

export function getScatter () {
  return (window as any).scatter
}

export async function getContract (abiName: any) {
  const client = await getClient()
  const contract = await client.contract(abiName)
  return contract
}
