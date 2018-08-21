import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import ChangeColoredText from './ChangeColoredText'

it('renders without crashing', () => {
  const element = <ChangeColoredText />
  const div = document.createElement('div')
  ReactDOM.render(element, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders positive changes correctly', () => {
  const element = <ChangeColoredText change={ 1 }>Up</ChangeColoredText>
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders negative changes correctly', () => {
  const element = <ChangeColoredText change={ -1 }>Down</ChangeColoredText>
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders no changes correctly', () => {
  const element = <ChangeColoredText change={ 0 }>None</ChangeColoredText>
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})
