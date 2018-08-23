import React from 'react'
import propTypes from 'prop-types'
import { Provider as ReduxProvider } from 'react-redux'

import { APIProvider } from 'api'

/**
 * Global provider component.
 * Combines provider-type components (Redux, API, React Router, Apollo)
 * into a single provider component.
 * Useful for unit testing.
 */
const Provider = ({ children, config, }) =>
  <APIProvider { ...config.api  }>
    <ReduxProvider store={ config.store }>
      {
        children
      }
    </ReduxProvider>
  </APIProvider>

Provider.propTypes = {
  config: propTypes.shape({
    api: propTypes.object.isRequired,
    store: propTypes.object.isRequired,
  }).isRequired,
}

export default Provider
