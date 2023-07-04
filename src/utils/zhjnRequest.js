// import utils from 'axios/lib/utils'
import settle from 'axios/lib/core/settle'
// import cookies from 'axios/lib/helpers/cookies'
import buildURL from 'axios/lib/helpers/buildURL'
import buildFullPath from 'axios/lib/core/buildFullPath'
// import parseHeaders from 'axios/lib/helpers/parseHeaders'
// import isURLSameOrigin from 'axios/lib/helpers/isURLSameOrigin'
import createError from 'axios/lib/core/createError'

import { MXCommon } from '@utils/mxApi'

const zhjnAdapter = function(config) {
  // console.log(config)
  return new Promise(function dispatchZhjnRequest(resolve, reject) {
    // let requestData = config.data
    let requestHeaders = config.headers
    let fullPath = buildFullPath(config.baseURL, config.url)
    /* let params = {
      type: config.method.toUpperCase(),
      url: buildURL(fullPath, config.params, config.paramsSerializer),
      async: true
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type'] // Let the browser set it
    }

    if (
      (utils.isBlob(requestData) || utils.isFile(requestData)) &&
      requestData.type
    ) {
      delete requestHeaders['Content-Type'] // Let the browser set it
    }

    // HTTP basic authentication
    if (config.auth) {
      let username = config.auth.username || ''
      let password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : ''
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password)
    } */

    MXCommon('ajax', {
      type: config.method.toUpperCase(),
      url: buildURL(fullPath, config.params, config.paramsSerializer),
      data: config.data,
      async: true,
      headers: requestHeaders,
      contentType: requestHeaders['Content-Type'] || 'application/json',
      dataType: config.responseType || 'json',
      timeout: config.timeout,
      success: function(data, status, xhr) {
        if (!xhr || xhr.readyState !== 4) {
          return
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (xhr.status === 0 && !(xhr.responseURL && xhr.responseURL.indexOf('file:') === 0)) {
          return
        }

        // Prepare the response
        let responseHeaders = 'getAllResponseHeaders' in xhr ? xhr.getAllResponseHeaders() : null
        let responseData = !config.responseType || config.responseType === 'text' ? xhr.responseText : xhr.response
        let response = {
          data: responseData,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: responseHeaders,
          config: config,
          request: xhr
        }
        // console.log(response)
        settle(resolve, reject, response)
      },
      error: function(data, status, xhr) {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        if (data && status) {
          // Prepare the response
          let responseHeaders = 'getAllResponseHeaders' in xhr ? xhr.getAllResponseHeaders() : null
          let responseData = !config.responseType || config.responseType === 'text' ? xhr.responseText : data
          let response = {
            data: responseData,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: responseHeaders,
            config: config,
            request: xhr
          }
          settle(resolve, reject, response)
        } else {
          reject(createError('Network Error', config, null, xhr))
        }
      }
    })
  })
}

export default zhjnAdapter
