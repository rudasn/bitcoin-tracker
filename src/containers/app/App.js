import React, { PureComponent } from 'react'

import './App.css'
import Bitfinex from 'metrics/bitfinex'

class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <Bitfinex
          currency="£"
          property="last_price"
          ticker="btcgbp"
          title="BTC to GBP"
        />
        <Bitfinex
          currency="£"
          property="bid"
          ticker="btcgbp"
          title="BTC to GBP (bid)"
        />
        <footer>
          Copyright &copy;
        </footer>
      </div>
    );
  }
}

export default App
