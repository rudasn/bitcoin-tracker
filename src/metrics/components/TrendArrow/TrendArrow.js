import React from 'react'

import './arrows.css'
import ChangeColoredText from '../ChangeColoredText'

export const Arrow = ({ change=0 }={}) => {
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
