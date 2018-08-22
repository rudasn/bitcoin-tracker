import React, { PureComponent } from 'react'

import './App.css'
import Bitfinex from 'metrics/bitfinex'

class App extends PureComponent {
  render() {
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
          <Bitfinex
            currency="£"
            property="bid"
            ticker="btcgbp"
            title="BTC to GBP (Bid Price)"
          />
          <Bitfinex
            currency=""
            property="volume"
            ticker="btcgbp"
            title="BTC to GBP (Volume)"
          />
        </main>
        <footer>
          Copyright &copy;
        </footer>
      </div>
    );
  }
}

export default App
