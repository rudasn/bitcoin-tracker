// Extract global config variables.
// The config would be passed on a top-level React element (a Provider)
// that injects the variables to children (through Context).

import api from './api'
import env from './env'
import store from './redux-store'

const config = {
  api,
  env,
  store,
}

console.log(`Loaded Config:\n${ JSON.stringify(config, true, 4) }`)

export default config
