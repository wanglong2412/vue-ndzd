const IS_PROD = ['production'].includes(process.env.VUE_APP_NODE_ENV)
const plugins = ['lodash']
// 生产环境移除console
if (IS_PROD) {
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins,
  compact: false
}
