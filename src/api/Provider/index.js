import React, { PureComponent } from 'react'

import createApi from '../api'

const { Provider, Consumer } = React.createContext(null)

export const withAPI = WrappedComponent => props =>
  <Consumer>
    {
      api => <WrappedComponent api={ api } { ...props } />
    }
  </Consumer>


/**
 * Provides access to the api to child components (via withAPI).
 */
class APIProvider extends PureComponent {
  // todo: create api from props in state
  render() {
    const api = createApi(this.props)
    const { children } = this.props

    return (
      <Provider value={ api }>
        {
          children
        }
      </Provider>
    )
  }
}

export default APIProvider
