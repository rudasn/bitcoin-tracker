import React from 'react'
import ReactDOM from 'react-dom'

import Chart from './index'
import ChartTest from './ChartTest'

it('should export TestChart', () => {
  expect(Chart).toBe(ChartTest)
})

it('should render without crashing', () => {
  const element = <Chart/>
  const div = document.createElement('div')
  ReactDOM.render(element, div)
  ReactDOM.unmountComponentAtNode(div)
})
