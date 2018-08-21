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

// todo
xit('should fetch a ticker', () => {})
xit('should handle errors when fetching a ticker', () => {})
xit('should only have one request open at a time for a ticker', () => {})
