import EventEmitter from './utils/eventEmitter'
import {
  isAndroid,
  isIOS
} from './utils/browser'

class SzhJSSDKConstructor extends EventEmitter {
  constructor() {
    super([
      'error',
      'closeWindow',
      'getSSOToken'
    ])
  }

  // 验证API接口
  _checkApi(api) {
    let result = {
      code: '000000',
      msg: `数字化管理平台：接口[${api}]有效！`
    }
    if (isIOS) {
      if (!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[api])) {
        result.code = '100030'
        result.msg = `数字化管理平台：接口[${api}]不存在！`
        this.trigger(this.eventTypes.error, result)
      }
    } else if (isAndroid) {
      if (!(window.goBack && window.goBack.over)) {
        result.code = '100030'
        result.msg = `数字化管理平台：接口[${api}]不存在！`
        this.trigger(this.eventTypes.error, result)
      }
    }
    return result
  }

  closeWindow() {
    let _this = this
    let validApi = this._checkApi('goBack')
    if (isIOS) {
      if (validApi.code === '000000') {
        window.webkit.messageHandlers.goBack.postMessage('')
        _this.trigger(_this.eventTypes.closeWindow, {})
      }
    } else if (isAndroid) {
      if (validApi.code === '000000') {
        window.goBack.over()
        _this.trigger(_this.eventTypes.closeWindow, {})
      }
    }
    return validApi
  }

  getSSOToken() {
    let _this = this

    function sendToken(token) {
      _this.trigger(_this.eventTypes.getSSOToken, {
        token
      })
    }

    window.sendToken = sendToken
    window.webkit.messageHandlers.getMXToken.postMessage('')
  }
}

export default SzhJSSDKConstructor
