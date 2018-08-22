// Redux actions
export const BITFINEX_REQUEST = 'METRICS/BITFINEX/REQUEST'
export const BITFINEX_RESPONSE = 'METRICS/BITFINEX/RESPONSE'
export const BITFINEX_ERROR = 'METRICS/BITFINEX/ERROR'

export const requestBitfinex = payload => ({
  type: BITFINEX_REQUEST,
  payload,
})

export const responseBitfinex = payload => ({
  type: BITFINEX_RESPONSE,
  payload,
})

export const errorBitfinex = payload => ({
  type: BITFINEX_ERROR,
  payload,
})

const isTickerLoading = (state, ticker) =>
  state.metrics.bitfinex[ticker] &&
    state.metrics.bitfinex[ticker].loading

export const fetchBitfinex = ({ api, ticker }) => (dispatch, getState) => {
  if (isTickerLoading(getState(), ticker)) {
    return Promise.resolve()
  }
  // todo: also check for interval between requests for the same ticker
  dispatch(requestBitfinex({ ticker }))

  return api.get(`/proxy?url=https://api.bitfinex.com/v1/pubticker/${ ticker }`)
    .then(response => {
        if (response && response.error) {
          throw response.error
        }
        dispatch(responseBitfinex({ ticker, response }))
        return response
    }).then(null, error => {
        dispatch(errorBitfinex({ ticker, error }))
        throw error
      }
    )
}
