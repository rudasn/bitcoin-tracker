import React, { PureComponent } from 'react'
import date from 'utils/date'

import './App.css'
import Bitfinex from 'metrics/bitfinex'

class App extends PureComponent {
  render() {
    const { env: { VERSION, NAME } } = this.props.config
    return (
      <div className="app">
        <h1 className="app-title">Outlyer Bitcoin Tracker</h1>
        <main className="app-main">
          <Bitfinex
            currency="£"
            property="last_price"
            ticker="btcgbp"
            title="BTC to GBP (Last Price)"
          />
        </main>
        <footer>
          <div className="app-copyright">
            <p><small>Copyright &copy; { date().getFullYear() } Nicolas Rudas</small></p>
            <p><small>{ NAME }@{ VERSION }</small></p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App
