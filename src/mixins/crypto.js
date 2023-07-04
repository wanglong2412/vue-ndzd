import CryptoJS from 'crypto-js'

export default {
  data () {
    return {}
  },
  computed: {},
  methods: {
    aesEncrypt (data) {
      let newData = `${data}`
      let key = CryptoJS.enc.Utf8.parse('d3YmI1BUOSE2S2YmalBVZUQ=')
      let iv = CryptoJS.enc.Utf8.parse('0000000000000000')
      let encryptedData = CryptoJS.AES.encrypt(newData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      return `${encryptedData}`
    }
  }
}
