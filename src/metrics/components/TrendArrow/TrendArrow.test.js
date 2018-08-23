import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { Arrow } from './TrendArrow'

it('renders without crashing', () => {
  const element = <Arrow />
  const div = document.createElement('div')
  ReactDOM.render(element, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders no change correctly', () => {
  const element = <Arrow change={ 0 } />
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders positive correctly', () => {
  const element = <Arrow change={ 1 } />
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders negative correctly', () => {
  const element = <Arrow change={ -1 } />
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})
