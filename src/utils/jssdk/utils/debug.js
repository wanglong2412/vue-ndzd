export function warn(msg) {
  console.error(`[ZhjnJSSDK warn]: ${msg}`)
}

export function assert(condition, msg) {
  if (!condition) {
    throw new Error(`[ZhjnJSSDK] ${msg}`)
  }
}
