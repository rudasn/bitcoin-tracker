import React, { PureComponent } from 'react'

/**
 * A dummy chart component to be used for unit testing.
 */
class TestChart extends PureComponent {
  render() {
    return JSON.stringify(this.props, true, 4)
  }
}

export default TestChart
