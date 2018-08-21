import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompact'

import Panel from 'metrics/components/Panel'

import { withAPI } from 'api'
import * as actions from './actions'
import getTickerOptions from './tickers'
import reducerCreator from './reducer'


class BitfinexContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.fetch = this.fetch.bind(this)
    this.initialize = this.initialize.bind(this)
    this.teardown = this.teardown.bind(this)
    this.initialized = false
    this.fetchInterval = null
  }
  componentDidMount() {
    this.initialize()
  }
  componentWillUnmount() {
    this.teardown()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.ticker !== this.props.ticker) {
      this.initialize()
    }
  }
  initialize() {
    if (this.initialized) {
      this.teardown()
    }
    this.fetch()
    this.fetchInterval = setInterval(() => {
      this.fetch()
    }, 6000)
    this.initialized = true
  }
  teardown() {
    clearInterval(this.fetchInterval)
  }
  fetch() {
    const { dispatch, ticker, api } = this.props
    dispatch(actions.fetchBitfinex({ ticker, api, }))
  }
  render() {
    const { title, points=[], property, ticker } = this.props
    const { chartOptions, tableOptions } = getTickerOptions(this.props)

    const last = points[ points.length - 1 ]

    if (!last) { return null }

    const value = last.point[property]
    const changes = last.changes && last.changes[property]
    const [ change, percentage ] = changes || [ 0, 0 ]

    return (
      <Panel
        title={ title }
        value={ value }
        change={ change }
        dateUpdated={ last.date }
        percentage={ percentage }
        chartOptions={ chartOptions }
        tableOptions={ tableOptions }
        />
    )
  }
}

const mapStateToProps = (state, props) => {
  const { ticker } = props
  return state.metrics.bitfinex[ticker] || {}
}

export {
  actions,
  reducerCreator,
}

export default compose(
  withAPI,
  connect(mapStateToProps)
)(BitfinexContainer)
