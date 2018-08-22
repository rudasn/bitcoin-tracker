import React from 'react'
import propTypes from 'prop-types'

import date from 'utils/date'

import './panel.css'
import PointsTable from '../PointsTable'
import Chart from '../Chart'
import Ticker from '../Ticker'

const Panel = ({ title, value, change=0, percentage=0, error, loading, dateUpdated, chartOptions={}, tableOptions={}, }) =>
  <section className="panel">
    <header className="panel-header">
      <div className="panel-state">
        {
          error ?
            <div className="error">{ error.message ? error.message : 'Unknown Error' }</div> :
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
  title: propTypes.string,
  value: propTypes.node,
  change: propTypes.number,
  percentage: propTypes.number,
  dateUpdated: propTypes.instanceOf(Date),
  chartOptions: propTypes.object,
  tableOptions: propTypes.object,
  error: propTypes.object,
  loading: propTypes.bool,
}

export default Panel
