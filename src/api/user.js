import request from '@utils/request'
// import qs from 'qs'

/**
 * User-通用获取用户基本信息
 * url:'/xdsp/getUserInfo'
 * method:GET
 * @Header Authorization: 登录接口返回的token
 * @Query params:{
 * }
 * @returns {*}
 */
export const getUserInfoAPI = (params = {}) => {
  return request.get('/v2/xdsp/getUserInfo', { params })
}

/**
 * User-获取用户行为统计数据
 * url:'/v1/analysis/app_data'
 * method:GET
 * @Header Authorization: 登录接口返回的token
 * @Query params:{
 * }
 * @returns {*}
 */
export const getUserBehaviorStatisticsAPI = (params = {}) => {
  return request.post('/v1/analysis/app_data', params)
}
