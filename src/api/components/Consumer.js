import React from 'react'

export default ({ Consumer }) => WrappedComponent => props =>
  <Consumer>
    {
      api => <WrappedComponent api={ api } { ...props } />
    }
  </Consumer>
