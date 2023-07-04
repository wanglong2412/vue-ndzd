'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@api': resolve('src/api'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
      '@config': resolve('src/config'),
      '@dictionaries': resolve('src/dictionaries'),
      '@filters': resolve('src/filters'),
      '@icons': resolve('src/icons'),
      '@mixins': resolve('src/mixins'),
      '@router': resolve('src/router'),
      '@store': resolve('src/store'),
      '@utils': resolve('src/utils'),
      '@views': resolve('src/views')
    }
  }
}
