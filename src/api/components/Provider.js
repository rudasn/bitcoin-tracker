import React, { PureComponent } from 'react'


/**
 * Provides access to the api to child components (via withAPI).
 */
export class APIProvider extends PureComponent {
  // todo: create api from props in state
  render() {
    const { children, Provider, createApi } = this.props
    const api = createApi(this.props)

    return (
      <Provider value={ api }>
        {
          children
        }
      </Provider>
    )
  }
}

export default ({ createApi, Provider }) => props =>
  <APIProvider
    createApi={ createApi }
    Provider={ Provider }
    { ...props }
  />
