import BigNumber from 'bignumber.js'
import { Serialize, Numeric } from 'eosjs'
import Amax from '@amax/amaxjs'
const { format } = Amax.modules

/**
 * 帐号转bigNumber
 * @param {*} accountName
 * @returns
 */
export const nameToNumeric = (accountName: any) =>
  format.encodeName(accountName, false)

// 生成随机UUID
export const makeUUID = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const radix = chars.length
  const uuid = []
  // eslint-disable-next-line
  for (let i = 0; i < 32; i++) uuid[i] = chars[0 | Math.random() * radix]
  return uuid.join('')
}

export const $BigNumber = (val: string | number = 1) => {
  return new BigNumber(val)
}

export const $shiftedBy = (data: number, acc: number) => {
  if (!data) return 0
  acc = Number(acc)
  return $BigNumber(data).shiftedBy(acc)
}

export const $toFixed = (data: any, acc: number) => {
  if ((!data && data !== 0) || String(data).includes('--')) return '--'
  return Number($BigNumber(data).toFixed(acc, 1))
}

export const $numFormat = (val: string | number, flag: boolean = true) => {
  if (!val || !flag) return val
  const reg = /(\d)(?=(?:\d{3})+$)/g
  const strAry = val.toString().split('.')
  return `${strAry[0].replace(reg, '$1,')}${strAry.length > 1 ? '.' + strAry[1] : ''}`
}

export const $dateFormat = (date: string | undefined, format: string = 'MM-dd hh:mm') => {
  if (!date) return ''
  return (new Date(date) as any).format(format)
}

export const $gt = (val: string | number, next: string | number) => {
  return new BigNumber(val).gt(next)
}

export const $lt = (val: string | number, next: string | number) => {
  return new BigNumber(val).lt(next)
}

export const $minus = (m1: string | number, m2: string | number, decimal: number = 2): number => {
  const diff: any = new BigNumber(m1).minus(m2)
  return Number(diff.toFixed(decimal, 1))
}

export const $inputNumber = (): string => {
  return window.innerWidth < 960 ? 'number' : 'text'
}

export const $moreLessThan = (value: string | number, acc = 4) => {
  const val = $BigNumber(value)
  return !val.isZero() && val.isLessThan(0.0001)
    ? '< 0.0001'
    : val.isNaN()
      ? value
      : Number(val.toFormat(acc))
}

export const $hash = (txHash: string, length: number = 4, lastLength?: number) => {
  if (!txHash) {
    return '--'
  }
  if (!lastLength) lastLength = length
  return (
    txHash.substring(0, length) +
      '...' +
      txHash.substring(txHash.length - lastLength, txHash.length)
  )
}

export const scalName = (accountName: string | number): string[] => {
  accountName = 'planowner3'
  let str: any = accountName
  if (typeof (accountName) === 'string') {
    const sb = new Serialize.SerialBuffer({
      textEncoder: new window.TextEncoder(),
      textDecoder: new window.TextDecoder()
    })

    sb.pushName(accountName)
    str = Numeric.binaryToDecimal(sb.getUint8Array(8))
  }

  const pow = $BigNumber(2).pow(64).toFixed()
  const min: any = $BigNumber(str).multipliedBy($BigNumber(2).pow(64).toFixed()).toString(10)
  const max = $BigNumber(min).plus(pow).minus(1).toFixed()

  return [min, max]
}

export const scalName1 = (accountName: string | number): string[] => {
  // accountName = 'planowner3';
  let str: any = accountName
  if (typeof (accountName) === 'string') {
    const sb = new Serialize.SerialBuffer({
      textEncoder: new window.TextEncoder(),
      textDecoder: new window.TextDecoder()
    })

    sb.pushName(accountName)
    str = Numeric.binaryToDecimal(sb.getUint8Array(8))
  }
  return [str]
}

export const sleep = async (time: number): Promise<any> => {
  return await new Promise((resolve) => setTimeout(resolve, time))
}
