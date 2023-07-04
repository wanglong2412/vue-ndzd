import { isProduction } from '@config/config'

let vConsole
if (!isProduction) {
  Promise.all([import(/* webpackChunkName: "VConsole" */ 'vconsole')])
    .then(([vConsoleModule]) => {
      let VConsole = vConsoleModule.default
      vConsole = new VConsole()
    })
}
export default vConsole
