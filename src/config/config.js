import defaultImage from '../assets/logo.png'
import lazyloadImage from '../assets/images/lazyload.png'

/**
 * Prefix
 * @type {string}
 */
export const PREFIX = 'Cyui'

/**
 * 项目名称
 * @type {string}
 */
export const appTitle = process.env.VUE_APP_TITLE

/**
 * 项目APP_ID
 * @type {string}
 */
export const appId = process.env.VUE_APP_ID

/**
 * 项目版本号 1.0.1
 * @type {string}
 */
export const appVersionName = process.env.VUE_APP_VERSION_NAME

/**
 * 项目执行环境
 * @type {boolean}
 */
export const vueNodeENV = process.env.VUE_APP_NODE_ENV

/**
 * 判断执行环境 是否在智慧江南APP打开
 * @type {boolean}
 */
export const isNative = process.env.VUE_APP_NATIVE !== 'false'

/**
 * 是否自定义头部
 * @type {boolean}
 */
export const isCustomHeader = process.env.VUE_APP_HEADER !== 'false'

/**
 * 是否本地开发环境
 * @type {boolean}
 */
export const isDevelopment = ['development'].includes(process.env.VUE_APP_NODE_ENV)

/**
 * 是否正式生产环境
 * @type {boolean}
 */
export const isStaging = ['staging'].includes(process.env.VUE_APP_NODE_ENV)

/**
 * 是否正式生产环境
 * @type {boolean}
 */
export const isProduction = ['production'].includes(process.env.VUE_APP_NODE_ENV)

/**
 * 配置API根模块
 * @type {string}
 */
export const baseAPIModule = process.env.VUE_APP_API_MODULE

/**
 * 配置API根域名
 * @type {string}
 */
export const baseAPIPath = process.env.VUE_APP_API_PATH

/**
 * 配置图片根域名
 * @type {string}
 */
export const basePicPath = process.env.VUE_APP_PIC_PATH

/**
 * 默认图片
 * @type {string}
 */
export const defaultPic = defaultImage

/**
 * 懒加载图片
 * @type {string}
 */
export const lazyloadPic = lazyloadImage

/**
 * 中断请求提示文案
 * @type {string}
 */
export const cancelAxiosText = '前端处理，请求中断!!!'
