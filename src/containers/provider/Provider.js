import React from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { APIProvider } from 'api'

/**
 * Global provider component.
 * Combines provider-type components (Redux, API, React Router, Apollo)
 * into a single provider component.
 * Useful for unit testing.
 */
export default ({ children, config, }) =>
  <APIProvider { ...config.api  }>
    <ReduxProvider store={ config.store }>
      {
        children
      }
    </ReduxProvider>
  </APIProvider>
