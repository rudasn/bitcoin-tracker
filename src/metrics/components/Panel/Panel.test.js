import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Panel from './Panel'

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
