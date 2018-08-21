import React from 'react'
import propTypes from 'prop-types'

import './change-text.css'

const ChangeColoredText = ({ children, change=0 }) => {
  let className

  if (change > 0) {
    className='change-colored-text-up'
  } else if (change < 0) {
    className='change-colored-text-down'
  } else {
    className='change-colored-text'
  }

  return <span className={ className }>{ children }</span>
}

ChangeColoredText.propTypes = {
  change: propTypes.number,
}

export default ChangeColoredText
