import React from 'react'
import propTypes from 'prop-types'

import './panel.css'
import PointsTable from '../PointsTable'
import Chart from '../Chart'
import Ticker from '../Ticker'

export const formatErrorMessage = error => {
  if (typeof error === 'string') {
    return error
  } else if (typeof error.message === 'string') {
    return error.message
  } else if (typeof error.name === 'string') {
    return error.name
  }
  return 'Unknown Error'
}

const Panel = ({ title, value, change=0, percentage=0, error, loading, dateUpdated, chartOptions={}, tableOptions={}, }) =>
  <section className="panel">
    <header className="panel-header">
      <div className="panel-state">
        {
          error ?
            <div className="error">{ formatErrorMessage(error) }</div> :
            loading ?
              'Updating...' :
              null
        }
      </div>
      <h2 className="panel-title">{ title }</h2>
      <h3 className="panel-subtitle">
        <Ticker change={ change } value={ value } percentage={ percentage } />
      </h3>
    </header>
    <main className="panel-main">
      <div className="panel-chart">
        <Chart options={ chartOptions } />
      </div>
      {
        tableOptions.rows && tableOptions.rows.length > 1 ?
          <div className="panel-recent-changes">
            <h4>Most Recent Changes</h4>
            <PointsTable rows={ tableOptions.rows } />
          </div> :
          null
      }
    </main>
    <footer className="panel-footer">
      <p><small>Last updated: <strong>{ dateUpdated ? dateUpdated.toString() : '-' }</strong></small></p>
    </footer>
  </section>

Panel.propTypes = {
  change: propTypes.number,
  chartOptions: propTypes.object,
  dateUpdated: propTypes.instanceOf(Date),
  error: propTypes.object,
  loading: propTypes.bool,
  percentage: propTypes.number,
  tableOptions: propTypes.object,
  title: propTypes.string,
  value: propTypes.node,
}

export default Panel
