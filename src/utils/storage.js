/**
 * 存储storage
 */
export const setStorage = (name, content, type = 'sessionStorage') => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window[type].setItem(name, content)
}

/**
 * 获取storage
 */
export const getStorage = (name, type = 'sessionStorage') => {
  if (!name) return
  return window[type].getItem(name)
}

/**
 * 删除storage
 */
export const removeStorage = (name, type = 'sessionStorage') => {
  if (!name) return
  window[type].removeItem(name)
}
