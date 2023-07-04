import { formatMoney, formatDate } from '@utils/index.js'

export default {
  data() {
    return {}
  },
  computed: {},
  methods: {},
  filters: {
    formatMoney,
    formatDate,
    formatName(data) { // 姓名过滤
      return new Array(data.length).join('*') + data.substr(-1)
    },
    phoneFilter(data) { // 手机号过滤
      let reg = /(\d{3})\d{4}(\d{4})/
      return data && data.replace(reg, '$1 **** $2')
    },
    bankCardFilter(data) { // 银行卡号过滤
      let reg = /^(\d{4})\d+(\d{4})$/
      return data && data.replace(reg, '$1 **** **** $2')
    },
    renderSize(value) { //  格式化文件大小
      if (!value) {
        return '0 Bytes'
      }
      let unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      let index = 0
      let srcsize = parseFloat(value)
      index = Math.floor(Math.log(srcsize) / Math.log(1024))
      let size = srcsize / Math.pow(1024, index)
      //  保留的小数位数
      size = size.toFixed(2)
      return size + unitArr[index]
    },
    formatPhotos(data) {
      return `${data}/jnbank.png`
    }
  }
}
