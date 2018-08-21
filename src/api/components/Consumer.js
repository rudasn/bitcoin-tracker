import React from 'react'

/**
 * API Consumer creator.
 * Creates a HOC that consumes the API.
 * The HOC provides the `api` as prop to the `WrappedComponent`.
 *
 * @param {Object} options
 * @param {ReactElement} options.Consumer The React Context Consumer to use.
 * @return {Fuction} HOC function definition. Accepts React Component to wrap.
 */
const APIConsumerCreator = ({ Consumer }) => WrappedComponent => props =>
  <Consumer>
    {
      api => <WrappedComponent api={ api } { ...props } />
    }
  </Consumer>

export default APIConsumerCreator
