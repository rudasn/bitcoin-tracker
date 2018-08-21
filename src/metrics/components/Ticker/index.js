import React from 'react'

import ChangeColoredText from '../ChangeColoredText'
import TrendArrow from '../TrendArrow'

export default ({ change=0, value=null, percentage=0 }) =>
  <div className="ticker">
    <TrendArrow change={ change }/>
    <span>{ value } </span>
    <ChangeColoredText change={ change }>
      { change.toFixed(2) } ({ percentage.toFixed(2) }%)
    </ChangeColoredText>
  </div>
