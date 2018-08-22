import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Provider from 'containers/provider'

import date from 'utils/date'
import { BitfinexContainer } from './BitfinexContainer'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockApi = (response, error) => {
  const id = Date.now()
  const _mockApiGet = jest.fn()
  return {
    _mockApiGet,
    get: () => {
      _mockApiGet(error ? error : response)
      return error ? Promise.reject(error) : Promise.resolve(response)
    },
  }
}

it('renders without crashing', () => {
  const api = mockApi({})
  const store = mockStore({ metrics: { bitfinex: {} } })
  const element = (
    <BitfinexContainer
      property="last_price"
      ticker="btcgbp"
      api={ api }
      dispatch={ store.dispatch }
    />
  )
  const div = document.createElement('div')
  ReactDOM.render(element, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders initial state', () => {
  const api = mockApi({})
  const store = mockStore({ metrics: { bitfinex: {} } })
  const element = (
    <BitfinexContainer
      property="last_price"
      ticker="btcgbp"
      api={ api }
      dispatch={ store.dispatch }
    />
  )
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders success state', () => {
  const api = mockApi({})
  const store = mockStore({ metrics: { bitfinex: {} } })
  const element = (
    <BitfinexContainer
      property="last_price"
      ticker="btcgbp"
      currency="GBP"
      api={ api }
      dispatch={ store.dispatch }
      points={[
        { point: { last_price: "1234.456" }, date: date() },
      ]}
    />
  )
  const tree = renderer.create(element).toJSON()
  expect(tree).toMatchSnapshot()
})

describe('refreshes after a certain amount of time', () => {
  const api = mockApi({})
  const store = mockStore({ metrics: { bitfinex: {} } })
  const element = (
    <BitfinexContainer
      property="last_price"
      ticker="btcgbp"
      currency="GBP"
      api={ api }
      dispatch={ store.dispatch }
      points={[
        { point: { last_price: "1234.456" }, date: date() },
      ]}
      updateEvery={ 1 }
    />
  )

  jest.useFakeTimers()
  const div = document.createElement('div')
  ReactDOM.render(element, div)

  it('fetches data on mount', () => {
    expect(api._mockApiGet).toHaveBeenCalledTimes(1)
  })

  it('fetches data every interval', () => {
    jest.runTimersToTime(10)
    expect(api._mockApiGet).toHaveBeenCalledTimes(11)
  })

  it('stops fetching when component is unmounted', () => {
    ReactDOM.unmountComponentAtNode(div)
    jest.runTimersToTime(100)
    expect(api._mockApiGet).toHaveBeenCalledTimes(11)
  })
})
