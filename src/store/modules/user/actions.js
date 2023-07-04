import * as types from './mutations_types'
import { appId, isNative, vueNodeENV } from '@config/config'
import platformJSSDK from '@utils/platformJSSDK'
import { getUserInfoAPI } from '@api/user'

export default {
  async GetSSOToken({ commit }) { // 根据AppID获取当前用户的sso_token
    try {
      let zhjnJSSDK = await platformJSSDK.init()
      let response = await zhjnJSSDK.getSSOToken({
        appId
      })
      console.log(response)
      commit(types.SET_TOKEN, response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async GetUserInfo({ commit, state }) { // 获取用户基本信息
    try {
      let response = {}
      if (isNative || vueNodeENV === 'development_zhjn') {
        let zhjnJSSDK = await platformJSSDK.init()
        response = await zhjnJSSDK.getCurrentUser({})
      } else {
        let { data: result } = await getUserInfoAPI()
        let resultData = result.data || {}
        response = {
          login_name: resultData.loginName,
          name: resultData.userName
        }
      }
      console.log(response)
      commit(types.SET_USER_INFO, response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async SETSSOToken({ commit }, data) { // 设置token
    try {
      console.log(data)
      commit(types.SET_TOKEN, data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async SetUserId({ commit }, data) { // 设置userId
    try {
      console.log(data)
      commit(types.SET_USER_ID, data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  HandleLogout({ commit, state }) { // 退出登录
    return new Promise((resolve, reject) => {
      commit(types.SET_TOKEN, '')
      commit(types.SET_USER_INFO, {})
      resolve()
    })
  }
}
