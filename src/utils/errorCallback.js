import { isProduction } from '@config/config'

/**
 * 接口请求错误回调
 * @param response
 */
export const errorCallback = response => {
  // console.log(response)
  let { config, data: result } = response
  let returnInfo = {
    isError: false,
    errorCode: '',
    errorMessage: ''
  }
  switch (response.status) {
    case 401:
    case 403:
      returnInfo = {
        isError: true,
        errorCode: 401,
        errorMessage: `${isProduction ? '' : '智慧江南错误：'}${result.msg ||
          '无权访问！'}`
      }
      break
    case 404:
    case 500:
    case 502:
      returnInfo = {
        isError: true,
        errorCode: 500,
        errorMessage: `${isProduction ? '' : '智慧江南错误：'}${result.msg ||
          '请求失败！'}`
      }
      break
    default:
      // 判断是否需要全局拦截
      if (config.headers.INTERCEPT !== 'false') {
        // if (`${result.status}` === '401') {
        //   returnInfo = {
        //     isError: true,
        //     errorCode: 401,
        //     errorMessage: `${isProduction ? '' : '智慧江南错误：'}${result.msg || '无权访问！'}`
        //   }
        // } else {
        //   if (`${result.status}` !== '0000') {
        //     returnInfo = {
        //       isError: true,
        //       errorCode: 200,
        //       errorMessage: `${isProduction ? '' : '智慧江南错误：'}${result.msg || '请求失败！'}`
        //     }
        //   }
        // }
      }
  }
  return returnInfo
}
