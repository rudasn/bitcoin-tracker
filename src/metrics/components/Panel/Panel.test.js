import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Panel, { formatErrorMessage } from './Panel'

it('renders without crashing', () => {
  const element = <Panel />
  const div = document.createElement('div')
  ReactDOM.render(element, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const element = (
    <Panel
      title="This is a panel"
      value={ 1047 }
      change={ 1.05 }
      percentage={ 0.043105 }
    />
  )
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})

describe('renders error correctly', () => {
  it('handles strings', () => {
    const error = 'this is an error'
    expect(formatErrorMessage(error)).toBe('this is an error')
  })
  it('handles Error objects', () => {
    const error = new Error('this is an error')
    expect(formatErrorMessage(error)).toBe('this is an error')
  })
  it('handles object with "message" property', () => {
    const error = { message: 'this is an error' }
    expect(formatErrorMessage(error)).toBe(error.message)
  })
  it('handles object with "name" property', () => {
    const error = { name: 'this is an error' }
    expect(formatErrorMessage(error)).toBe(error.name)
  })
  it('"message" property takes precedence over "name" property', () => {
    const error = { name: 'this is the name', message: 'this is the message' }
    expect(formatErrorMessage(error)).toBe(error.message)
  })
  it('handles unknown errors', () => {
    const error = {}
    expect(formatErrorMessage(error)).toBe('Unknown Error')
  })
})
