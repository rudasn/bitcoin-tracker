import React, { PureComponent } from 'react'
import propTypes from 'prop-types'

/**
 * Provides access to the api to child components (via `Consumer`).
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

APIProvider.propTypes = {
  Provider: propTypes.func.isRequired,
  createApi: propTypes.func.isRequired
}

/**
 * Creates an API Provider Component with the passed options.
 *
 * @param {object} options
 * @param {function} options.createApi Returns an `api` object.
 * @param {ReactElement} options.Provider The React Context Provider to use.
 */
export const APIProviderCreator = ({ createApi, Provider }) => props =>
  <APIProvider
    createApi={ createApi }
    Provider={ Provider }
    { ...props }
  />


export default APIProviderCreator
