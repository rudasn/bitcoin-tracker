import React from 'react'

export default ({ rows=[] }) =>
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
