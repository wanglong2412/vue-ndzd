import FastClick from 'fastclick' // 为避免浏览器兼容问题引起的点击问题

let deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0
let deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone

FastClick.prototype.focus = function (targetElement) {
  // console.log(targetElement)
  let length
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}

export default FastClick
