
import date from 'utils/date'

import {
  BITFINEX_ERROR,
  BITFINEX_REQUEST,
  BITFINEX_RESPONSE,
} from './actions'

const metrics = [
  'ask',
  'bid',
  'high',
  'last_price',
  'low',
  'mid',
  'volume',
]

export const createDefaultState = () => ({
  error: null,
  lastChange: {},
  lastChecked: null,
  lastResponse: null,
  loading: null,
  points: [],
})

const getTickerState = (state, ticker) => {
  if (state.hasOwnProperty(ticker)) {
    return state[ticker]
  }

  return createDefaultState()
}

const getChangeBetweenPoints = ({ point={} }={}, newPoint={}) => {
  return metrics.reduce((memo, key) => {
    if (
      point.hasOwnProperty(key) &&
      newPoint.hasOwnProperty(key) &&
      point[key] !== newPoint[key]
    ) {
      // todo: sanitize input
      const newValue = parseFloat(newPoint[key])
      const oldValue = parseFloat(point[key])

      memo[key] = [
        newValue - oldValue,
        ((newValue - oldValue) / oldValue) * 100,
      ]
    }

    return memo
  }, {})
}

export default ({ limit=10 }={}) => (state={}, action) => {
  const { type, payload: { ticker, response, error }={} } = action
  const tickerState = getTickerState(state, ticker)

  if (!ticker) {
    return state
  }

  switch(type) {
    case BITFINEX_REQUEST:

      return {
        ...state,
        [ticker]: {
          ...tickerState,
          error: null,
          lastChecked: date(),
          loading: true,
        }
      }

    case BITFINEX_RESPONSE:
      const lastResponse = date()
      const changes = getChangeBetweenPoints(
        tickerState.points[ tickerState.points.length - 1 ],
        response,
      )

      let points = tickerState.points.concat({
        point: response,
        date: lastResponse,
        changes,
      })

      if (points.length > limit) {
        points = points.slice(-limit)
      }

      return {
        ...state,
        [ticker]: {
          ...tickerState,
          error: null,
          lastResponse,
          lastChange: {
            ...tickerState.lastChange,
            ...changes,
          },
          loading: false,
          points,
        }
      }

    case BITFINEX_ERROR:

      return {
        ...state,
        [ticker]: {
          ...tickerState,
          error,
          loading: false,
        }
      }

    default:
      return state
  }
}
