import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import createAPIConsumer from './Consumer'

class Consumer extends React.PureComponent {
  render() {
    return this.props.children()
  }
}

it('renders without crashing', () => {
  const withApi = createAPIConsumer({ Consumer, })
  const Component = withApi(props => null)
  const element = <Component />
  const div = document.createElement('div')
  ReactDOM.render(element, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const withApi = createAPIConsumer({ Consumer, })
  const Component = withApi(props => JSON.stringify(props))
  const element = <Component hello="world!" />
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})
