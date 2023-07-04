import Mock from 'mockjs'
import { paramsToObj } from '../src/utils/index'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '@ctitle(10, 50)',
    content: '@cparagraph',
    date: '@datetime("yyyy-MM-dd HH:mm")',
    author: '@cname',
    status: '@integer(1, 4)'
  }))
}

let getNotesList = config => {
  const { keyword = '', page = 1, size = 20 } = paramsToObj(config)
  let mockList = List.filter(item => {
    if (keyword && item.title.indexOf(keyword) < 0) return false
    return true
  })
  const listData = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))
  return {
    data: {
      hasMore: true,
      list: listData
    },
    msg: '交易成功',
    code: '200'
  }
}

export default {
  getNotesList
}
