import Mock from 'mockjs'
import organizationAPI from './organization'
import userAPI from './user'
import operationalIndicatorAPI from './operationalIndicator'

Mock.setup({
  timeout: '500-2000'
})

// Organization页面接口
Mock.mock(
  /\/xdsp\/getVideoCatalogTree/,
  'get',
  organizationAPI.getOrganizationList
)

// User页面接口
Mock.mock(/\/xdsp\/getUserInfo/, 'get', userAPI.getUserInfoAPI)

// 办公年报
Mock.mock(/\/wyhhz\/getListData/, 'get', operationalIndicatorAPI.getListData)

export default Mock
