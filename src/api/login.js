import request from '@utils/request'
import qs from 'qs'

/**
 * 登录-注册
 * url:'/netloanserver/login/reg'
 * method:POST
 * @Header Authorization: 登录接口返回的token
 * @Query params:{
    mobileno: 187*****, // 手机号
    captcha: 123456, // 验证码
    serialnum: A11, // 业务序号
    loginpassword: ***** // 登录密码(字母+数字)8-16位
 * }
 * @returns {*}
 */
export const registerAPI = (params) => {
  return request.post('/netloanserver/login/reg', qs.stringify(params))
}

/**
 * 登录-登录
 * url:'/netloanserver/login/verify'
 * method:POST
 * @Header Authorization: 登录接口返回的token
 * @Query params:{
    mobileno: 187*****, // 手机号
    loginpassword: ***** // 登录密码
 * }
 * @returns {*}
 */
export const loginAPI = (params) => {
  return request.post('/netloanserver/login/verify', qs.stringify(params))
}

/**
 * 登录-重置密码
 * url:'/netloanserver/login/resetLoginPassword'
 * method:POST
 * @Header Authorization: 登录接口返回的token
 * @Query params:{
    mobileno: 187*****, // 手机号
    captcha: 123456, // 验证码
    serialnum: A11, // 业务序号
    loginpassword: ***** // 登录密码(字母+数字)8-16位
 * }
 * @returns {*}
 */
export const resetPasswordAPI = (params) => {
  return request.post('/netloanserver/login/resetLoginPassword', qs.stringify(params))
}
