const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
// const VConsolePlugin = require('vconsole-webpack-plugin') // console调试

// 拼接路径
const resolve = dir => path.join(__dirname, '.', dir)

const IS_PROD = ['production'].includes(process.env.VUE_APP_NODE_ENV)
const port = 8085 // dev port

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  assetsDir: process.env.VUE_APP_ASSETS_DIR,
  lintOnSave: true,
  configureWebpack: config => {
    let plugins = [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve('./plugin.properties'),
            to: resolve(`./${process.env.VUE_APP_OUTPUT_DIR}/../`),
            transform(content, absoluteFrom) {
              let contentStr = content.toString()
              contentStr = contentStr.replace(/appId/, `${process.env.VUE_APP_ID}`)
              contentStr = contentStr.replace(/versionCode/, `${process.env.VUE_APP_VERSION_CODE}`)
              contentStr = contentStr.replace(/versionName/, `${process.env.VUE_APP_VERSION_NAME}`)
              return contentStr
            },
            globOptions: {
              ignore: ['.*']
            }
          },
          {
            from: resolve('./config.properties'),
            to: resolve(`./${process.env.VUE_APP_OUTPUT_DIR}/`),
            transform(content, absoluteFrom) {
              let contentStr = content.toString()
              contentStr = contentStr.replace(/isCustomHeader/, `${process.env.VUE_APP_HEADER}`)
              return contentStr
            },
            globOptions: {
              ignore: ['.*']
            }
          }
        ]
      })
      // new VConsolePlugin({
      //   filter: [],
      //   enable: !IS_PROD
      // })
    ]
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    // 删除 moment 语言包
    config
      .plugin('ignore')
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      )
    config.plugin('loadshReplace')
      .use(new LodashModuleReplacementPlugin()) // 优化lodash
    if (process.env.VUE_APP_ANALYZER === 'true') { // 分析
      config.plugin('webpack-bundle-analyzer')
        .use(new BundleAnalyzerPlugin()) // 使用webpack-bundle-analyzer 生成报表
    }
    // 设置Title
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.VUE_APP_TITLE
        return args
      })
    // svg
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // file
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(resolve('src/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader')
    // alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@config', resolve('src/config'))
      .set('@dictionaries', resolve('src/dictionaries'))
      .set('@filters', resolve('src/filters'))
      .set('@icons', resolve('src/icons'))
      .set('@mixins', resolve('src/mixins'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 直接覆盖变量
          // 'border-color': '#eee',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${resolve('src/assets/styles/vant/variables.less')}";`
        }
      }
    }
  },
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    proxy: {
      [process.env.VUE_APP_API_MODULE]: {
        target: process.env.VUE_APP_API_PATH,
        ws: false,
        changeOrigin: true,
        headers: {
          'DOMAIN-ID': '2',
          'NETWORK-ID': '2'
        },
        pathRewrite: {
          ['^' + process.env.VUE_APP_API_MODULE]: process.env.VUE_APP_API_MODULE
        }
      }
    }
  }
}
