/**
 * 运行状态
 0 未运行
 1 正在运行
 2 运行完成
 3 存在失败
 * @type {{}}
 */
export const statusMap = {
  '0': {
    style: 'gray',
    text: '未运行'
  },
  '1': {
    style: 'primary',
    text: '正在运行'
  },
  '2': {
    style: 'success',
    text: '运行完成'
  },
  '3': {
    style: 'warn',
    text: '存在失败'
  }
}
