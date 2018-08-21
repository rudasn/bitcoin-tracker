import React from 'react'

import './change-text.css'

export default ({ children, change }) => {
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
