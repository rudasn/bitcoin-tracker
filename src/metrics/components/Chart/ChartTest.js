import React, { PureComponent } from 'react'

/**
 * A dummy chart component to be used for unit testing.
 * We assume that the third-party Chart library has been
 * independently unit tested and has passed all tests so
 * we only want to test that our Chart component exports
 * correctly and can be used in other components.
 */
class TestChart extends PureComponent {
  render() {
    return JSON.stringify(this.props, true, 4)
  }
}

export default TestChart
