import React, { PureComponent } from 'react'
import { CanvasJSChart } from 'libs/canvasjs-2.2/canvasjs.react'

/**
 * A wrapper component around the CanvasJS library.
 * In case we want to switch to a different charting library
 * we only need to update this file.
 */
class Chart extends PureComponent {
  render() {
    const { options } = this.props
    return (
      <CanvasJSChart options={ options }/>
    )
  }
}

export default Chart
