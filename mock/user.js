import Mock from 'mockjs'

let getUserInfoAPI = config => {
  return {
    data: Mock.mock({
      'num1|1-100': 100,
      'num2|1-100': 100,
      'num3|1-100': 100,
      'num4|1-100': 100,
      'num5|1-100': 100,
      'num6|1-100': 100,
      'num7|1-100': 100,
      'num8|1-100': 100
    }),
    msg: '交易成功',
    code: '200'
  }
}

export default {
  getUserInfoAPI
}
