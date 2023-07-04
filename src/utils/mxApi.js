import qs from 'qs'
// import store from '@store'
import { baseAPIModule } from '@config/config'
import { errorCallback } from '@utils/errorCallback'
import { return401Page, returnErrorPage } from '@utils/common'

function MXApi(callbacks) {
  let deviceReady = false
  let taskQueue = []
  document.addEventListener(
    'deviceready',
    function deviceReadyHandler() {
      deviceReady = true
      taskQueue.forEach(function(task) {
        applyApi.apply(null, task)
      })
      callbacks.ready && callbacks.ready()
      document.removeEventListener('deviceready', deviceReadyHandler, false)
    },
    false
  )

  function applyApi(namespace, api, args) {
    if (window[namespace] && window[namespace][api]) {
      callbacks.beforeApply && callbacks.beforeApply(namespace, api, args)
      window[namespace][api].apply(null, args)
    } else if (!deviceReady) {
      taskQueue.push([namespace, api, args])
    } else {
      callbacks.error &&
        callbacks.error(
          ['该终端没有', namespace, '.', api, '方法!'].join(''),
          namespace,
          api
        )
      throw new Error(['该终端没有', namespace, '.', api, '方法!'].join(''))
    }
  }

  return applyApi
}

const applyApi = MXApi({
  ready: function() {
    console.log('device ready!!')
  },
  error: function(err) {
    console.log(err)
  },
  beforeApply: function(namespace, api, args) {}
})
const makeApi = namespace => (api, ...args) => applyApi(namespace, api, args)
export const MXCommon = makeApi('MXCommon')
const MXWebui = makeApi('MXWebui')
const MXContacts = makeApi('MXContacts')
const MXLocation = makeApi('MXLocation')
const WifiWizard = makeApi('WifiWizard')
const MXChat = makeApi('MXChat')
export const getCurrentBSSID = () =>
  new Promise((resolve, reject) => {
    WifiWizard('getCurrentBSSID', resolve, reject)
  })
export const showOptionMenu = () => {
  return MXWebui('showOptionMenu')
}

export const setCustomHeaderMenu = (...args) => {
  return MXWebui('setCustomHeaderMenu', ...args)
}
export const getSSOToken = (...args) => {
  return MXCommon('getSSOToken', ...args)
}
// export const getLocation = (...args) => {
//     return MXLocation('getLocation', ...args);
// }

export const getLocation = args => {
  return new Promise((resolve, reject) =>
    MXLocation('getLocation', resolve, reject, args)
  )
}

export const closeWindow = () => {
  return MXWebui('closeWindow')
}

export const getUDID = callback => {
  return new Promise((resolve, reject) => {
    MXCommon('getUDID', {
      onSuccess: resolve,
      onFail: reject
    })
  })
}
export const getCurrentUser = callback => {
  return new Promise((resolve, reject) => {
    MXCommon('getCurrentUser', resolve)
  })
}

export const MXSelectUsers = userIds => {
  return new Promise((resolve, reject) => {
    MXContacts(
      'selectUsers',
      function(result) {
        resolve(result)
      },
      {
        customUserIDS: userIds,
        enableSelectDept: false,
        canSelectSelf: true
      }
    )
  })
}

export const getServerUrl = () => {
  return new Promise((resolve, reject) => {
    MXCommon('getServerUrl', resolve)
  })
}

export const scanQRCode = (isImmediate = false) => {
  return new Promise((resolve, reject) => {
    MXCommon('scanQRCode', isImmediate, resolve, reject)
  })
}

export const openUrlPage = (url = '') => {
  return new Promise((resolve, reject) => {
    MXCommon('openUrlPage', url, function() {
      resolve()
    })
  })
}

export const lanuchApp = ({ appId, params = '' }) => {
  return new Promise((resolve, reject) => {
    MXCommon(
      'lanuchApp',
      `${appId}`,
      params,
      function(result) {
        resolve(result)
      },
      function(error) {
        reject(error)
      }
    )
  })
}

export const setNavigationBarTitle = (title = '') => {
  return new Promise((resolve, reject) => {
    MXCommon('setNavigationBarTitle', title, function() {
      resolve()
    })
  })
}

/**
 * 办公年报-保存自定义首页数据
 * @param title
 * @returns {Promise<unknown>}
 */
export const setRefreshBankPresidentCardData = () => {
  return new Promise((resolve, reject) => {
    MXCommon('setRefreshBankPresidentCardData')
    resolve()
  })
}

/**
 * 发起聊天
 * @param loginNames
 * @returns {Promise<unknown>}
 */
export const chat = (loginNames = []) => {
  return new Promise((resolve, reject) => {
    MXChat('chat', loginNames, function() {})
    resolve()
  })
}

export const enableTranslucentHeader = (...args) => {
  return MXWebui('enableTranslucentHeader', ...args)
}

/**
 * 获取状态栏的高度
 * @param args
 * @returns {*}
 */
// export const getStatusBarHeight = (...args) => {
//   return MXWebui('getStatusBarHeight', ...args)
// }

export const getStatusBarHeight = ({ onlyStatusBar }) => {
  return new Promise((resolve, reject) => {
    MXWebui('getStatusBarHeight', {
      onlyStatusBar,
      onSuccess(result) {
        resolve(result)
      },
      onFail(error) {
        reject(error)
      }
    })
  })
}

export const showNavBarHeight = (...args) => {
  return MXWebui('showNavBarHeight', ...args)
}
export const hideNavBarHeight = (...args) => {
  return MXWebui('hideNavBarHeight', ...args)
}

/**
 * 群聊进行对话
 * @param args
 * @returns {Promise<unknown>}
 */
export const sendPluginMessage = (...args) => {
  return new Promise((resolve, reject) => {
    MXChat('sendPluginMessage', ...args, resolve, reject)
  })
}

export const ajax = params => {
  // store.dispatch('base/SetLoading', true)
  return new Promise((resolve, reject) => {
    params = Object.assign({}, params, {
      async: true,
      headers: {
        // 'mx_sso_token': `${store.getters.token}`
        // 'org_id': `${store.getters.organizationId}`
      },
      contentType: 'application/json',
      dataType: 'JSON',
      timeout: '15000',
      success(data, status, xhr) {
        console.log(data)
        console.log(status)
        console.log(xhr)
        data = JSON.parse(data)
        // console.log('ajax_success==>>', data)
        let returnInfo = errorCallback({
          status: +xhr.status,
          data: data
        })
        if (returnInfo.isError) {
          if (returnInfo.errorCode === 401) {
            return401Page()
          } else {
            returnErrorPage()
          }
          reject(new Error(`${returnInfo.errorMessage}`))
        } else {
          resolve({
            data: data,
            status,
            xhr
          })
        }
      },
      error(data, status, xhr) {
        console.log('=================')
        console.log(data)
        console.log(status)
        console.log(xhr)
        // data = JSON.parse(data)
        // console.log('ajax_error==>>' + data)
        /* let xhrStr = JSON.stringify(xhr)
        if (xhrStr.includes('"status":502')) {
          reject(new Error(`服务器出错：502错误，${status}`))
        } else {
          let error = JSON.parse(data)
          switch (error.status) {
            case 401:
            case 403:
            case 404:
            case 500:
              break
          }
          // eslint-disable-next-line prefer-promise-reject-errors
          // reject({ data: data, status, xhr })
          reject(error)
        } */
        let error = JSON.parse(data)
        /* let returnInfo = errorCallback({
          status: +xhr.status,
          data: error
        })
        if (returnInfo.isError && returnInfo.errorCode === 401) {
          return401Page()
        } else {
          returnErrorPage()
        } */
        returnErrorPage()
        reject(error)
      },
      complete(XMLHttpRequest, textStatus) {
        // console.log(XMLHttpRequest)
        // console.log(textStatus)
        // store.dispatch('base/SetLoading', false)
      }
    })
    // console.log('url==>>' + params.url)
    // console.log('organno==>>' + `${store.getters.organizationId}`)
    MXCommon('ajax', params)
  })
}
export const ajaxGet = (url, query) => {
  url = query ? `${baseAPIModule}${url}?${qs.stringify(query)}` : url
  // url = encodeURI(url)
  const params = {
    type: 'GET',
    url
  }
  return ajax(params)
}
export const ajaxPost = (url, data) => {
  return ajax({
    type: 'POST',
    url: `${baseAPIModule}${url}`,
    data: data
  })
}
export const ajaxPut = (url, data) => {
  return ajax({
    type: 'PUT',
    url: `${baseAPIModule}${url}`,
    data
  })
}
export const ajaxDelete = (url, data) => {
  return ajax({
    type: 'DELETE',
    url: `${baseAPIModule}${url}`,
    data
  })
}
