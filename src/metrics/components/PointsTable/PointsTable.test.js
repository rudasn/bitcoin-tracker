import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import PointsTable from './PointsTable'

it('renders without crashing', () => {
  const element = <PointsTable />
  const div = document.createElement('div')
  ReactDOM.render(element, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders cells correctly', () => {
  const rows = [
    [ 'column1', 'column2', 'column3', 'column4' ],
    [ 0, 0, '1', '1',  ]
  ]
  const element = <PointsTable rows={ rows } />
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})
