import React, { PureComponent } from 'react'
import { CanvasJSChart } from 'libs/canvasjs-2.2/canvasjs.react'

class Chart extends PureComponent {
  render() {
    const { options } = this.props
    return (
      <CanvasJSChart options={ options }/>
    )
  }
}

export default Chart
