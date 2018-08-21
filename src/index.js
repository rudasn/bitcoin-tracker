import React from 'react'
import ReactDOM from 'react-dom'

import App from './containers/app'
import config from './config'
import Provider from './containers/provider'

ReactDOM.render(
  <Provider config={ config }>
    <App />
  </Provider>,
  document.getElementById('root')
)
