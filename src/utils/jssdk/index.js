import EventEmitter from './utils/eventEmitter'
import {
  isZhjn as isInZhjnApp,
  isSzh as isInSzhApp,
  isAndroid,
  isIOS,
  semverCompare,
  getZhjnVersion
} from './utils/browser'

import SzhJSSDKConstructor from './szhSDK'

let defaultApiList = []

class ZhjnJSSDKConstructor extends EventEmitter {
  isInZhjnApp = isInZhjnApp
  isAndroid = isAndroid
  isIOS = isIOS

  szhObj = undefined

  // 最低版本号
  minimumVersion = {
    ios: '6.4.6.201225',
    android: '6.8.0.201225'
  }

  /**
   * 初始化ZhjnJSSDK实例
   * @constructor
   * @param {object} zhjnConfig
   * {
   *   debug: true, // 开启调试模式
   *   appId: 'xxx',
   *   timestamp: '',
   *   nonceStr: '',
   *   signature: '',
   *   jsApiList: [],
   *   minimumVersion: {
   *     ios: '',
   *     android: ''
   *   }
   * }
   */
  constructor(zhjnConfig) {
    super(['ready', 'error'])

    this.config = zhjnConfig || {}

    if (this.config.minimumVersion) {
      this.minimumVersion = this.config.minimumVersion
    }

    let jsApiList = this.config.jsApiList || []
    this.config.jsApiList = [...defaultApiList, ...jsApiList]
  }

  init() {
    this._check()
  }

  _check() {
    if (isInZhjnApp || isInSzhApp) {
      if (isInZhjnApp) {
        // 验证智慧江南版本是否是有效
        let isValidVersion = this._checkSemverCompare() !== -1
        if (!isValidVersion) {
          // 智慧江南版本过低
          this.trigger(this.eventTypes.error, {
            code: '100020',
            msg: '智慧江南版本过低！'
          })
        }

        // 智慧江南初始化准备
        let _this = this
        if (window['MXCommon']) {
          _this.trigger(_this.eventTypes.ready)
        } else {
          if (document.addEventListener) {
            document.addEventListener(
              'deviceready',
              function deviceReadyHandler() {
                _this.trigger(_this.eventTypes.ready)
                document.removeEventListener(
                  'deviceready',
                  deviceReadyHandler,
                  false
                )
              },
              false
            )
          }
        }
      } else if (isInSzhApp) {
        this.szhObj = new SzhJSSDKConstructor()
        setTimeout(() => {
          this.trigger(this.eventTypes.ready)
        }, 0)
      }
    } else {
      // 判断是否在智慧江南、数字化客户端中打开
      this.trigger(this.eventTypes.error, {
        code: '100010',
        msg: '请在智慧江南或数字化客户端中打开！'
      })
    }
  }

  // 比较智慧江南版本
  _checkSemverCompare() {
    let {
      ios: minimumIOSVersion,
      android: minimumAndroidVersion
    } = this.minimumVersion
    let zhjnVersion = getZhjnVersion()
    if (isIOS) {
      return semverCompare(zhjnVersion, minimumIOSVersion, 4)
    } else if (isAndroid) {
      return semverCompare(zhjnVersion, minimumAndroidVersion, 4)
    }
  }

  // 验证API接口
  _checkApi(namespace, api) {
    let result = {
      code: '000000',
      msg: `智慧江南：接口[${namespace}][${api}]有效！`
    }
    if (!(window[namespace] && window[namespace][api])) {
      result.code = '100030'
      result.msg = `智慧江南：接口[${namespace}][${api}]不存在！`
      this.trigger(this.eventTypes.error, result)
    }
    return result
  }

  // 运行API接口
  _invokeApi({ namespace, api, reject }, ...args) {
    let validApi = this._checkApi(namespace, api)
    if (validApi.code === '000000') {
      window[namespace][api].apply(null, args)
    } else {
      reject(validApi)
    }
    return validApi
  }

  /**
   * 获取服务器地址
   * @param params
   * @returns {Promise<unknown>}
   */
  getServerUrl(params = {}) {
    return new Promise((resolve, reject) => {
      this._invokeApi(
        {
          namespace: 'MXCommon',
          api: 'getServerUrl',
          reject
        },
        function(response) {
          resolve(response)
        }
      )
    })
  }

  /**
   * 关闭窗口
   * @param params
   * {}
   * @returns {Promise<unknown>}
   */
  closeWindow(params = {}) {
    return new Promise((resolve, reject) => {
      if (isInZhjnApp) {
        this._invokeApi(
          {
            namespace: 'MXWebui',
            api: 'closeWindow',
            reject
          },
          function(response) {
            resolve(response)
          }
        )
      } else {
        let validApi = this.szhObj.closeWindow()
        if (validApi.code === '000000') {
          resolve()
        } else {
          reject(validApi)
        }
      }
    })
  }

  /**
   * 获取SSOToken
   * @param params
   * {
   *   appId: '' // 根据AppID获取当前用户的sso_token
   * }
   * @returns {Promise<unknown>}
   */
  getSSOToken(params = {}) {
    let { appId } = params
    return new Promise((resolve, reject) => {
      if (isInZhjnApp) {
        this._invokeApi(
          {
            namespace: 'MXCommon',
            api: 'getSSOToken',
            reject
          },
          appId,
          function(response) {
            resolve(response)
          }
        )
      } else if (isInSzhApp) {
        this.szhObj.on('getSSOToken', response => {
          resolve(response.token)
        })
        this.szhObj.getSSOToken()
      } else {
        reject(new Error('方法不存在！'))
      }
    })
  }

  /**
   * 获取当前用户信息
   * @param params
   * {}
   * @returns {Promise<unknown>}
   */
  getCurrentUser(params = {}) {
    return new Promise((resolve, reject) => {
      if (isInZhjnApp) {
        this._invokeApi(
          {
            namespace: 'MXCommon',
            api: 'getCurrentUser',
            reject
          },
          function(response) {
            resolve(response)
          }
        )
      } else if (isInSzhApp) {
        resolve({
          login_name: '57196'
        })
      } else {
        reject(new Error('方法不存在！'))
      }
    })
  }

  /**
   * 设置标题栏
   * @param params
   * {}
   * @returns {Promise<unknown>}
   */
  setNavigationBarTitle(params = {}) {
    let { title } = params
    return new Promise((resolve, reject) => {
      this._invokeApi(
        {
          namespace: 'MXCommon',
          api: 'setNavigationBarTitle',
          reject
        },
        title,
        function(response) {
          resolve(response)
        }
      )
    })
  }

  /**
   * 去掉刘海屏
   * @param params
   * {}
   * @returns {Promise<unknown>}
   */
  iphoneXBottomSetAside(params = {}) {
    return new Promise((resolve, reject) => {
      if (isInZhjnApp) {
        this._invokeApi({
          namespace: 'MXWebui',
          api: 'iphoneXBottomSetAside',
          reject
        })
        resolve()
      } else {
        resolve()
      }
    })
  }

  /**
   * 获取状态栏的高度
   * @param params
   * {}
   * @returns {Promise<unknown>}
   */
  getStatusBarHeight(params = {}) {
    let { onlyStatusBar } = params
    return new Promise((resolve, reject) => {
      if (isInZhjnApp) {
        this._invokeApi(
          {
            namespace: 'MXWebui',
            api: 'getStatusBarHeight',
            reject
          },
          {
            onlyStatusBar: onlyStatusBar,
            onSuccess(response) {
              console.log(response)
              resolve(response)
            },
            onFail(error) {
              reject(error)
            }
          }
        )
      } else if (isInSzhApp) {
        resolve({})
      } else {
        reject(new Error('方法不存在！'))
      }
    })
  }

  /**
   * AJAX
   * @param params
   * {}
   * @returns {Promise<unknown>}
   */
  ajax(params = {}) {
    return new Promise((resolve, reject) => {
      this._invokeApi(
        {
          namespace: 'MXCommon',
          api: 'ajax',
          reject
        },
        function(response) {
          resolve(response)
        }
      )
    })
  }
}

export default ZhjnJSSDKConstructor
