export const userAgent = navigator.userAgent || ''
// export const appVersion = navigator.appVersion || ''
export const platform = navigator.platform || ''

/**
 * 版本号比较
 * @param verionA
 * @param versionB
 * @param length 比较长度
 * @returns {number} -1 | 0 | 1
 */
export const semverCompare = (verionA, versionB, length = 3) => {
  const { isNaN } = window
  const splitA = verionA.split('.')
  const splitB = versionB.split('.')

  for (let i = 0; i < length; i++) {
    const snippetA = Number(splitA[i])
    const snippetB = Number(splitB[i])

    if (snippetA > snippetB) return 1
    if (snippetB > snippetA) return -1

    // e.g. '1.0.0-rc' -- Number('0-rc') = NaN
    if (!isNaN(snippetA) && isNaN(snippetB)) return 1
    if (isNaN(snippetA) && !isNaN(snippetB)) return -1
  }

  return 0
}

/**
 * 获取ios大版本号
 * @returns {string}
 */
export const getIOSVersion = () => {
  const version = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/)
  return version ? Number.parseInt(version[1], 10) : ''
}

/**
 * 获取微信版本号
 * @returns {string}
 */
export const getWeChatVersion = () => {
  let version = userAgent.match(/micromessenger\/(\d+\.\d+\.\d+)/i) || userAgent.match(/micromessenger\/(\d+\.\d+)/i)
  return version ? version[1] : ''
}

/**
 * 获取智慧江南版本号
 * @returns {string}
 */
export const getZhjnVersion = () => {
  let version = userAgent.match(/minxingmessenger\/(\d+\.\d+\.\d+\.\d+)/i)
  return version ? version[1] : ''
}

// 判断是否是android终端
export const isAndroid = /(android)/i.test(userAgent)

// 判断是否是ios终端
export const isIOS = /(iphone|ipad|ipod|ios)/i.test(userAgent)

// 判断是否在微信内打开
export const isWechat = /micromessenger\/([\d.]+)/i.test(userAgent)

// 判断是否在智慧江南内打开
export const isZhjn = /minxingmessenger\/([\d.]+)/i.test(userAgent)

// 判断是否在DEMO内打开
// export const isSzh = userAgent.indexOf('demo') !== -1
export const isSzh = true
