import React from 'react'
import propTypes from 'prop-types'

/**
 * Renders a table with the rows passed.
 *
 * @param {object} props
 * @param {array} props.rows An array of rows where each row
 *                           is an array containing the cell values.
 *                           Treats the first row as the header row.
 * @returns {ReactElement} PointsTable
 */
const PointsTable = ({ rows=[[]] }) =>
  <table>
    <thead>
      <tr>
      {
        rows[0].map(
          cell => <th key={ cell }>{ cell }</th>
        )
      }
      </tr>
    </thead>
    <tbody>
    {
      rows.slice(1).map(
        row => (
          <tr key={ row.join('-') }>
            {
              row.map(
                (cell, i) => <td key={ [ cell, i ].join('-') }>{ cell }</td>
              )
            }
          </tr>
        )
      )
    }
    </tbody>
  </table>

PointsTable.propTypes = {
  rows: propTypes.arrayOf(propTypes.array),
}

export default PointsTable
