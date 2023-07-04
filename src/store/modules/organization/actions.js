import * as types from './mutations_types'
import { getOrganizationListAPI } from '@/api/organization'

export default {
  GetOrganizationList({ commit, state }, params = {}) { // 获取机构列表-请求数据：默认必须走接口请求
    let { organizationList } = state
    let { request = true } = params
    return new Promise((resolve, reject) => {
      if (request || JSON.stringify(organizationList) === '[]') {
        getOrganizationListAPI({})
          .then(response => {
            let result = response.data
            if (result.status === '0000') {
              commit(types.SET_ORGANIZATION_LIST, result.data.list || [])
              resolve({
                data: {
                  listData: result.data.list || []
                },
                message: result.message || '交易成功',
                status: result.status
              })
            } else {
              reject(new Error(result.message || '获取列表失败！'))
            }
          })
          .catch(error => {
            // console.log(error)
            reject(new Error(error.message || '获取列表失败！'))
          })
      } else {
        resolve({
          data: {
            listData: organizationList
          },
          message: '交易成功',
          status: '0000'
        })
      }
    })
  },
  SetOrganizationId({ commit, state }, data) { // 设置机构号
    return new Promise((resolve, reject) => {
      commit(types.SET_ORGANIZATION_ID, data)
      resolve()
    })
  }
}
