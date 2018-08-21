import React from 'react'

import './panel.css'
import PointsTable from '../PointsTable'
import Chart from '../Chart'
import Ticker from '../Ticker'

export default ({ title, value, change, percentage, ticker, property, dateUpdated, chartOptions, tableOptions, }) =>
  <section className="panel">
    <header>
      <h2 className="panel-title">{ title }</h2>
      <h3 className="panel-subtitle">
        <Ticker change={ change } value={ value } percentage={ percentage } />
      </h3>
    </header>
    <main>
      <div className="panel-chart">
        <Chart title={ title } options={ chartOptions } />
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
