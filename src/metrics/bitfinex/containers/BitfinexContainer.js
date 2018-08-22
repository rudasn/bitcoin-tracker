import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompact'
import propTypes from 'prop-types'

import Panel from 'metrics/components/Panel'
import { withAPI } from 'api'

import * as actions from '../actions'
import getTickerOptions from '../tickers'

export class BitfinexContainer extends PureComponent {
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
    const { updateEvery } = this.props
    if (this.initialized) {
      this.teardown()
    }
    this.fetch()
    this.fetchInterval = setInterval(() => {
      this.fetch()
    }, updateEvery)
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
    const { title, points, property, lastChange, currency, error, loading } = this.props
    const { chartOptions, tableOptions } = getTickerOptions(this.props) // todo: memo

    const last = points[ points.length - 1 ] || {}
    const value = last.point ? `${ currency }${ last.point[property] }` : null
    const changes = lastChange[property] || [ 0, 0 ]
    const [ change, percentage ] = changes

    return (
      <Panel
        title={ title }
        value={ value }
        change={ change }
        error={ error }
        loading={ loading }
        dateUpdated={ last.date }
        percentage={ percentage }
        chartOptions={ chartOptions }
        tableOptions={ tableOptions }
        />
    )
  }
}

BitfinexContainer.propTypes = {
  currency: propTypes.string,
  property: propTypes.string.isRequired,
  ticker: propTypes.string.isRequired,
  title: propTypes.string,
  updateEvery: propTypes.number,

  // from API HOC
  api: propTypes.object.isRequired,

  // from Redux state
  error: propTypes.object,
  lastChange: propTypes.object,
  lastChecked: propTypes.instanceOf(Date),
  lastResponse: propTypes.instanceOf(Date),
  loading: propTypes.bool,
  points: propTypes.arrayOf(propTypes.object),
}

BitfinexContainer.defaultProps = {
  points: [],
  updateEvery: 30000,
  lastChange: {},
  currency: '',
}

const mapStateToProps = (state, props) => {
  const { ticker } = props
  return state.metrics.bitfinex[ticker] || {}
}

export default compose(
  withAPI,
  connect(mapStateToProps)
)(BitfinexContainer)
