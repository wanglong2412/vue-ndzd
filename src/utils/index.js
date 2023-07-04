import { appTitle, isNative } from '@config/config'
import platformJSSDK from '@utils/platformJSSDK'

/**
 * JS文件中把px转rem
 * @param fontSize
 * @returns {number}
 */
export const formatPx2Rem = (fontSize) => {
  // let clientWidth = document.documentElement.clientWidth // 取当前设备的宽度
  // let htmlFontSize = parseFloat(document.getElementsByTagName('html')[0].style.fontSize) // 获取当前html的font-size
  // let reg = (clientWidth / 750) / htmlFontSize // 得到当前1px对应的rem值 750设计稿

  let UIWidth = 750 // 设计搞宽度
  let clientWidth = 750 // 默认以苹果8设备的宽度
  let htmlFontSize = 75
  let reg = (clientWidth / UIWidth) / htmlFontSize // 得到当前1px对应的rem值 750设计稿
  return Math.ceil(fontSize * reg * 100000) / 100000
}

/**
 * 判断字符串是不是JSON格式
 * @param str
 * @returns {boolean}
 */
export const isJSON = (str) => {
  if (typeof str === 'string') {
    try {
      let obj = JSON.parse(str)
      return !!(obj && typeof obj === 'object')
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

/**
 * 格式化日期为时间戳
 * @param date
 * @returns {*}
 */
export const formatTimestamp = function(date) {
  date = date || '1970-01-01 00:00:00'
  let timestamp = Date.parse(new Date(date)) ? new Date(date) : new Date(`${date.replace(/-/g, '/')}`)
  return Date.parse(timestamp)
}

/**
 * 格式化日期
 * @param date
 * @param format
 * @returns {string}
 */
export const formatDate = function(date, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  let week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(format)) {
    format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

/**
 * 货币格式
 * @param number
 * @param places
 * @param symbol
 * @param thousand
 * @param decimal
 * @returns {string}
 */
export const formatMoney = (number, places, symbol, thousand, decimal) => {
  number = number || 0
  places = !isNaN(places = Math.abs(places)) ? places : 2
  symbol = symbol !== undefined ? symbol : '$'
  thousand = thousand || ','
  decimal = decimal || '.'
  let negative = number < 0 ? '-' : ''
  let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
  let j = i.length
  j = j > 3 ? j % 3 : 0
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}

/**
 * 生成uuid
 * @param len 长度
 * @param radix 基数
 * @returns {string}
 */
export const uuid = function(len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    let r
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

/**
 * 参数转对象
 * @param url
 * @returns {{}}
 */
export function paramsToObj(url) {
  try {
    let obj = {}
    let arr = url.split('&')
    for (let i = 0; i < arr.length; i++) {
      let subArr = arr[i].split('=')
      obj[subArr[0]] = subArr[1]
    }
    return obj
  } catch (err) {
    return {}
  }
}

/**
 * query参数转对象
 * @param url
 * @returns {{}}
 */
export function queryToObj(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 获取title
 * @param pageTitle
 * @returns {string}
 */
export function getPageTitle(pageTitle) {
  return pageTitle ? `${pageTitle}` : `${appTitle}`
}

export async function setDocumentTitle(title) {
  try {
    document.title = title
    if (isNative) {
      let zhjnJSSDK = await platformJSSDK.init()
      if (zhjnJSSDK.isIOS) {
        await zhjnJSSDK.setNavigationBarTitle({
          title
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * 根据开始和结尾进行字符串替换
 * @param str 字符串
 * @param beginStr 匹配开始字符串
 * @param endStr 匹配结束字符串
 * @param replaceStr 替换的字符串
 * @returns {string}
 */
export function stringReplace({ str = '', beginStr = '', endStr = '', replaceStr = '' }) {
  let strArray = str.split(beginStr)
  let result = strArray[0]
  strArray.forEach((item, index) => {
    if (index > 0) {
      let itemArray = item.split(endStr)
      result += `${beginStr}`
      if (itemArray.length > 1) {
        result += `${replaceStr}${endStr}${itemArray[1]}`
      } else {
        result += itemArray[0]
      }
    }
  })
  return result
}
