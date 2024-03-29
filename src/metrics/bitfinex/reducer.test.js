
import date from 'utils/date'

import {
  requestBitfinex,
  responseBitfinex,
  errorBitfinex,
  BITFINEX_REQUEST,
  BITFINEX_RESPONSE,
  BITFINEX_ERROR,
} from './actions'

import reducerCreator, { createDefaultState } from './reducer'

const reducer = reducerCreator()

it('handles Bitfinex requests', () => {
  const newState = reducer(undefined, {
    type: BITFINEX_REQUEST,
    payload: {
      ticker: 'btcgbp'
    }
  })
  const expectedState = {
    btcgbp: {
      ...createDefaultState(),
      loading: true,
      lastChecked: date(),
    }
  }
  expect(newState).toEqual(expectedState)
})

describe('handles Bitfinex responses', () => {
  const bitfinexFirstResponse = {
    mid: '1.5',
    bid: '1.5',
    ask: '1.5',
    last_price: '1.5',
    low: '1.5',
    high: '1.5',
    volume: '15',
  }
  const newState = reducer({
    btcgbp: {
      ...createDefaultState(),
      lastChecked: date(),
    }
  }, {
    type: BITFINEX_RESPONSE,
    payload: {
      ticker: 'btcgbp',
      response: bitfinexFirstResponse,
    }
  })
  const expectedState = {
    btcgbp: {
      ...createDefaultState(),
      lastChecked: date(),
      lastResponse: date(),
      loading: false,
      points: [
        {
          date: date(),
          point: bitfinexFirstResponse,
          changes: {},
        }
      ],
    }
  }
  expect(newState).toEqual(expectedState)

  it('calculates change between points', () => {
    const bitfinexSecondResponse = {
      mid: '3',
      ask: '1.5',
      bid: '1.5',
      last_price: '3',
      volume: '30',
    }
    const changes = {
      mid: [ 1.5, 100 ],
      last_price: [ 1.5, 100 ],
      volume: [ 15, 100 ],
    }
    const changesState = reducer(newState, {
      type: BITFINEX_RESPONSE,
      payload: {
        ticker: 'btcgbp',
        response: bitfinexSecondResponse
      }
    })
    expect(changesState).toEqual({
      btcgbp: {
        lastChecked: date(),
        lastResponse: date(),
        loading: false,
        lastChange: changes,
        points: [
          {
            point: bitfinexFirstResponse,
            date: date(),
            changes: {},
          },
          {
            point: bitfinexSecondResponse,
            date: date(),
            changes,
          },
        ],
        error: null,
      }
    })
  })
  it('only keeps the most recent points', () => {
    const reducerWithLimit = reducerCreator({ limit: 3 })
    const limitedState = [1,2,3,4,5].reduce((state, count) => {
      return reducerWithLimit(state, {
        type: BITFINEX_RESPONSE,
        payload: {
          ticker: 'btcgbp',
          response: {
            last_price: `${ count }`,
          },
        }
      })
    }, undefined)

    expect(limitedState.btcgbp.points.length).toBe(3)
    expect(limitedState.btcgbp.points[0].point.last_price).toBe('3')
    expect(limitedState.btcgbp.points[1].point.last_price).toBe('4')
    expect(limitedState.btcgbp.points[2].point.last_price).toBe('5')
  })
})

it('handles Bitfinex errors', () => {
  const error = 'Something went wrong'
  const newState = reducer(undefined, {
    type: BITFINEX_ERROR,
    payload: {
      ticker: 'btcgbp',
      error,
    }
  })
  const expectedState = {
    btcgbp: {
      ...createDefaultState(),
      loading: false,
      error,
    }
  }
  expect(newState).toEqual(expectedState)
})

it('returns state otherwise', () => {
  const newState = reducer(undefined, {
    type: 'SOME/OTHER/ACTION',
    payload: {
      ticker: 'btcgbp',
    }
  })
  const expectedState = {}
  expect(newState).toEqual(expectedState)
})
