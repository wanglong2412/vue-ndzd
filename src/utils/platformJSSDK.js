import ZhjnJSSDKConstructor from '@utils/jssdk'

export default {
  init() {
    return new Promise((resolve, reject) => {
      let zhjnJSSDK = new ZhjnJSSDKConstructor({})

      zhjnJSSDK.on('ready', async () => {
        console.log('platformJssdk ready!!')
        resolve(zhjnJSSDK)
      })
      zhjnJSSDK.on('error', (response) => {
        console.log('error', response)
        reject(response)
      })
      zhjnJSSDK.init()
    })
  }
}
