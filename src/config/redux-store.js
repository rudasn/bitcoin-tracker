// global redux store config

import reduxLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import env from './env'

// Application Reducers
import metrics from 'metrics/store'

const reducers = combineReducers({
  metrics,
})

const middleware = [
  thunk,
]

if (env.NODE_ENV === 'development') {
  middleware.push(reduxLogger)
}

export default createStore(
  reducers,
  applyMiddleware(...middleware),
)
