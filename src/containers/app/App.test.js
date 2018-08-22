import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Provider from 'containers/provider'
import { mockStore, mockApi } from 'testUtils'

import App from './App'

it('renders without crashing', () => {
  const config = {
    api: mockApi({}),
    store: mockStore({ metrics: { bitfinex: {} } })
  }
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider config={ config }>
      <App />
    </Provider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
