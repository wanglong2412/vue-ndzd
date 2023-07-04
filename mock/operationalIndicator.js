import Mock from 'mockjs'
import { queryToObj } from '../src/utils/index'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@id',
    'unit|1': ['万元', '元', '户', '亿元'],
    indicatorInfo: {
      title: '@ctitle(5, 8)',
      accomplishAmount: '@integer(1000, 100000)', // 完成金额
      targetAmount: '@integer(1000, 100000)', // 目标金额
      toAmount: '@integer(1000, 100000)', // 差金额
      percent: '@integer(0, 100)' // 百分比
    },
    indicatorChart: {
      title: '@ctitle(5, 8)',
      'day30': [],
      'month3': [],
      'month6': []
    }
  }))
}

let getListData = config => {
  console.log(config)
  const { keyword = '', page = 1, size = 20 } = queryToObj(config.url)
  let mockList = List.filter(item => {
    if (keyword && item.title.indexOf(keyword) < 0) return false
    return true
  })
  const listData = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))
  return {
    data: {
      list: listData
    },
    msg: '交易成功',
    code: '200'
  }
}

export default {
  getListData
}
