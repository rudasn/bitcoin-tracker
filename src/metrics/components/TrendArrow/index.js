import React from 'react'

import ChangeColoredText from '../ChangeColoredText'
import './arrows.css'

const Arrow = ({ change }) => {
  if (change > 0) {
    return <span className="arrow arrow-up" />
  } else if (change < 0) {
    return <span className="arrow arrow-down" />
  }
  return <span className="arrow" />
}

export default ({ change=0, }) =>
  <ChangeColoredText change={ change }>
    <Arrow change={ change } />
  </ChangeColoredText>
