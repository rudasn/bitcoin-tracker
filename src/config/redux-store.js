// global redux store config

import reduxLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

// Application Reducers
import metrics from 'metrics/store'

const reducers = combineReducers({
  metrics,
})

export default createStore(
  reducers,
  applyMiddleware(
    thunk,
    reduxLogger,
  ),
)
