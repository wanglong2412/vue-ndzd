import XLSX from 'xlsx'
import { userOAListData } from '../data/oaData'

export default {
  data() {
    return {
      fileUrl: 'https://oa.jnbank.com.cn/f002/ndzd/oa_20211231.xls'
    }
  },
  computed: {},
  methods: {
    // 从网络上读取某个excel文件，url必须同域，否则报错
    async readWorkbookFromRemoteFile(url) {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = function(e) {
          if (xhr.status === 200) {
            let data = new Uint8Array(xhr.response)
            let workbook = XLSX.read(data, { type: 'array' })
            resolve(workbook)
          }
        }
        xhr.onerror = function() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(new Error('读取失败！'))
        }
        xhr.send()
      })
    },
    async readWorkbook(workbook) {
      return new Promise((resolve, reject) => {
        let sheetNames = workbook.SheetNames // 工作表名称集合
        let worksheet = workbook.Sheets[sheetNames[0]] // 这里我们只读取第一张sheet
        let data = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          header: 'A'
        })
        resolve(data)
      })
    },
    // 获取用户OA信息
    async getUserOAData({ loginName, isShowLoading = true }) {
      try {
        if (isShowLoading) {
          await this.$store.dispatch('base/SetLoading', true)
        }
        // let workbook = await this.readWorkbookFromRemoteFile(this.fileUrl)
        // let response = await this.readWorkbook(workbook)
        let response = userOAListData
        let data = response.find(item => item['C'] === loginName)
        this.detailInfo.oaData = data || {}
        console.log(this.detailInfo)
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
        if (isShowLoading) {
          await this.$store.dispatch('base/SetLoading', false)
        }
      }
    }
  }
}
