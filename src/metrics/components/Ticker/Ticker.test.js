import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Ticker from './Ticker'

it('renders without crashing', () => {
  const element = <Ticker />
  const div = document.createElement('div')
  ReactDOM.render(element, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders no change correctly', () => {
  const element = <Ticker change={ 0 } percentage={ 0 } value={ 0 } />
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders positive correctly', () => {
  const element = <Ticker change={ 1 } percentage={ 1 } value={ 1 } />
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders negative correctly', () => {
  const element = <Ticker change={ -1 } percentage={ -1 } value={ -1 } />
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})
