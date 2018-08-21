// redux store for metrics
import { combineReducers } from 'redux'

import { reducerCreator as bitfinexCreator } from '../bitfinex'

export default combineReducers({
  bitfinex: bitfinexCreator({
    limit: 2000,
  }),
})
