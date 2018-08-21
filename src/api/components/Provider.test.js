import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import createAPIProvider, { APIProvider } from './Provider'

class Provider extends React.PureComponent {
  render() {
    return <p>Provider</p>
  }
}

const createApi = ({ }) => ({ api: true, })

it('renders without crashing', () => {
  const element = <APIProvider Provider={ Provider } createApi={ createApi } />
  const div = document.createElement('div')
  ReactDOM.render(element, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const element = <APIProvider Provider={ Provider } createApi={ createApi } />
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})
