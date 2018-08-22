import { mockStore, mockApi } from 'testUtils'

import * as actions from './actions'

it('should create an action to fetch a ticker', () => {
  const payload = {
    ticker: 'btcgbp',
  }
  const expectedAction = {
    type: actions.BITFINEX_REQUEST,
    payload,
  }
  expect(actions.requestBitfinex(payload)).toEqual(expectedAction)
})

it('should create an action to accept a ticker response', () => {
  const payload = {
    ticker: 'btcgbp',
    response: {
      value: '0.22321',
    },
  }
  const expectedAction = {
    type: actions.BITFINEX_RESPONSE,
    payload,
  }
  expect(actions.responseBitfinex(payload)).toEqual(expectedAction)
})

it('should create an action to accept a ticker error', () => {
  const payload = {
    ticker: 'btcgbp',
    error: 'Something went wrong',
  }
  const expectedAction = {
    type: actions.BITFINEX_ERROR,
    payload,
  }
  expect(actions.errorBitfinex(payload)).toEqual(expectedAction)
})

it('should fetch a ticker', done => {
  const store = mockStore({ metrics: { bitfinex: {} } })
  const ticker = 'btcgbp'
  const response = { value: '1234.5678' }
  const api = mockApi(response)
  const expectedActions = [
    { type: actions.BITFINEX_REQUEST, payload: { ticker } },
    { type: actions.BITFINEX_RESPONSE, payload: { ticker, response, } },
  ]

  store.dispatch(
    actions.fetchBitfinex({ ticker, api })
  ).then(() => {
    expect(store.getActions()).toEqual(expectedActions)
    done()
  })
})

it('should handle network errors when fetching a ticker', done => {
  const store = mockStore({ metrics: { bitfinex: {} } })
  const ticker = 'btcgbp'
  const error = 'API limit reached'
  const api = mockApi(null, error)
  const expectedActions = [
    { type: actions.BITFINEX_REQUEST, payload: { ticker } },
    { type: actions.BITFINEX_ERROR, payload: { ticker, error, } },
  ]

  store.dispatch(
    actions.fetchBitfinex({ ticker, api })
  ).then(null, () => {
    expect(store.getActions()).toEqual(expectedActions)
    done()
  })
})

it('should handle response errors when fetching a ticker', done => {
  const store = mockStore({ metrics: { bitfinex: {} } })
  const ticker = 'btcgbp'
  const response = { error: 'API limit reached' }
  const api = mockApi(response)
  const expectedActions = [
    { type: actions.BITFINEX_REQUEST, payload: { ticker } },
    { type: actions.BITFINEX_ERROR, payload: { ticker, error: response.error, } },
  ]

  store.dispatch(
    actions.fetchBitfinex({ ticker, api })
  ).then(null, () => {
    expect(store.getActions()).toEqual(expectedActions)
    done()
  })
})

it('should only have one request open at a time for a ticker', done => {
  const store = mockStore({ metrics: { bitfinex: { btcgbp: { loading: true } } } })
  const ticker = 'btcgbp'
  const response = {}
  const api = mockApi(response)
  const expectedActions = []

  store.dispatch(
    actions.fetchBitfinex({ ticker, api })
  ).then(() => {
    expect(store.getActions()).toEqual(expectedActions)
    done()
  })

})
