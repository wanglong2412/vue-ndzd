import request from '@utils/request'
// import qs from 'qs'

// import { ajaxGet } from '@utils/mxApi'

/**
 * Organization-机构号查询
 * url:'/xdsp/getVideoCatalogTree'
 * method:GET
 * @Header Authorization: 登录接口返回的token
 * @Query params:{}
 * @returns {*}
 */
export const getOrganizationListAPI = (params = {}) => {
  return request.get('/xdsp/getVideoCatalogTree', { params })
  /* return new Promise((resolve, reject) => {
    ajaxGet('/api/v2/xdsp/getVideoCatalogTree', params)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  }) */
}
