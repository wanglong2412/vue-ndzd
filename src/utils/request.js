import axios from 'axios'
import qs from 'qs'
import store from '@store'
import {
  isNative,
  vueNodeENV,
  isDevelopment,
  baseAPIModule
} from '@config/config'
import { errorCallback } from '@utils/errorCallback'
import { return401Page, returnErrorPage } from '@utils/common'
import zhjnRequest from '@utils/zhjnRequest'

// 是否在智慧江南环境下执行
if (isNative) {
  axios.defaults.adapter = zhjnRequest
}

// 创建axios实例
const instance = axios.create({
  baseURL: isDevelopment ? `${baseAPIModule}` : `${baseAPIModule}`, // 本地开发环境使用代理
  headers: {
    // `headers` 是即将被发送的自定义请求头
    'Content-Type': 'application/json'
  },
  paramsSerializer: function(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 50000 // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // console.log(config)
    // 在发送请求之前做些什么
    // 不在智慧江南环境下需要token
    if (!isNative && store.getters.token) {
      // 在浏览器上模拟智慧江南环境
      if (vueNodeENV === 'development_zhjn') {
        config.headers.common['AUTHORIZATION'] = `bearer ${store.getters.token}`
      } else {
        config.headers.common['Authorization'] = `bearer ${store.getters.token}` // Bearer
      }
      config.headers.common['token'] = `${store.getters.token}` // Bearer
      config.headers.common['userId'] = `${store.getters.userId}` // Bearer
    }
    // config.headers.common['org_id'] = `${store.getters.organizationId}` // organizationId
    // config.headers.common['organizationId'] = `${store.getters.organizationId}` // organizationId
    // store.dispatch('base/SetLoading', true)
    return config
  },
  error => {
    // 对请求错误做些什么
    // console.log(error) // for debug
    // store.dispatch('base/SetLoading', false)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  async response => {
    // 对响应数据做点什么
    // store.dispatch('base/SetLoading', false)
    console.log(response)
    let returnInfo = errorCallback(response)
    if (returnInfo.isError) {
      if (returnInfo.errorCode === 401) {
        return401Page()
      } else {
        returnErrorPage()
      }
      throw new Error(returnInfo.errorMessage)
    }
    return response
  },
  error => {
    // 对响应错误做点什么
    // store.dispatch('base/SetLoading', false)
    console.log('err' + error) // for debug
    console.log('err' + error.config) // for debug
    console.log('err' + error.request) // for debug
    console.log('err' + error.response) // for debug
    console.log('err' + JSON.stringify(error.response)) // for debug
    if (error.response) {
      let returnInfo = errorCallback(error.response)
      if (returnInfo.isError && returnInfo.errorCode === 401) {
        return401Page()
      } else {
        returnErrorPage()
      }
      return Promise.reject(new Error(returnInfo.errorMessage))
    } else {
      return Promise.reject(error)
    }
  }
)

export default instance
