import React from 'react'
import propTypes from 'prop-types'

import './ticker.css'
import ChangeColoredText from '../ChangeColoredText'
import TrendArrow from '../TrendArrow'

const Ticker = ({ change=0, value=null, percentage=0 }) =>
  <div className="ticker">
    <TrendArrow change={ change }/>
    <span>{ value } </span>
    <ChangeColoredText change={ change }>
      { change.toFixed(2) } ({ percentage.toFixed(2) }%)
    </ChangeColoredText>
  </div>

Ticker.propTypes = {
  change: propTypes.number,
  percentage: propTypes.number,
  value: propTypes.node,
}

export default Ticker
