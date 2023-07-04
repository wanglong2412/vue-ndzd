import { isJSON } from '@utils/index.js'
import { getStorage } from '@utils/storage.js'

export default {
  token: getStorage('token') || '', // token
  userId: getStorage('user_id') || '', // userId
  userInfo: isJSON(getStorage('user_info'))
    ? JSON.parse(getStorage('user_info'))
    : {} // 用户基本信息
}
