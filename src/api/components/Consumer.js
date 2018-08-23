import React, { PureComponent } from 'react'

/**
 * API Consumer creator.
 * Creates a HOC that consumes the API.
 * The HOC provides the `api` as prop to the `WrappedComponent`.
 *
 * @param {Object} options
 * @param {ReactElement} options.Consumer The React Context Consumer to use.
 * @return {Fuction} HOC function definition. Accepts React Component to wrap.
 */
const APIConsumerCreator = ({ Consumer }) => {
  const APIConsumerHOC = WrappedComponent => {
    class APIConsumer extends PureComponent {
      render() {
        return (
          <Consumer>
            {
              api => <WrappedComponent api={ api } { ...this.props } />
            }
          </Consumer>
        )
      }
    }

    return APIConsumer
  }

  return APIConsumerHOC
}

export default APIConsumerCreator
