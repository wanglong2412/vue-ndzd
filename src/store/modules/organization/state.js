import { isJSON } from '@utils/index.js'
import { getStorage } from '@utils/storage.js'

export default {
  organizationList: isJSON(getStorage('organization_list')) ? JSON.parse(getStorage('organization_list')) : [], // 用户基本信息
  organizationId: getStorage('organization_id') || '' // 机构号
}
