import React from 'react'
import propTypes from 'prop-types'

import date from 'utils/date'

import './panel.css'
import PointsTable from '../PointsTable'
import Chart from '../Chart'
import Ticker from '../Ticker'

const Panel = ({ title, value, change=0, percentage=0, dateUpdated=date(), chartOptions={}, tableOptions={}, }) =>
  <section className="panel">
    <header>
      <h2 className="panel-title">{ title }</h2>
      <h3 className="panel-subtitle">
        <Ticker change={ change } value={ value } percentage={ percentage } />
      </h3>
    </header>
    <main>
      <div className="panel-chart">
        <Chart options={ chartOptions } />
      </div>
      <div className="panel-recent-changes">
        <h4>Most Recent Changes</h4>
        <PointsTable rows={ tableOptions.rows } />
      </div>
    </main>
    <footer>
      Last updated: { dateUpdated.toString() }
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
}

export default Panel
