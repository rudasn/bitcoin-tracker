import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Provider from 'containers/provider'
import { mockStore, mockApi } from 'testUtils'

import App from './index'

it('renders without crashing', () => {
  const config = {
    api: mockApi({}),
    env: {},
    store: mockStore({ metrics: { bitfinex: {} } })
  }
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider config={ config }>
      <App config={ config } />
    </Provider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
