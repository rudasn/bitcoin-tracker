export const formatTableDate = date => date.toISOString().split('T')[1].slice(0, -1)
export const formatTableChange = change => change.toFixed(4)


/**
 * Returns ticker configuration options for use in charts or tables.
 *
 * @param {object} options
 * @param {array} options.points Array of points (objects).
 * @param {string} options.currency The currency we are converting to (eg. $).
 * @param {string} options.property The property of the points we want to display (eg. last_price).
 */
export default ({ points=[], currency, property, tableLimit=15 }) => ({
  chartOptions: {
    theme: 'light2',
    zoomEnabled: true,
    axisY: {
      includeZero: false,
      interval: 5, // todo: change inteval according to points' min max difference.
      prefix: currency,
    },
    axisX: {
      interval: 30,
      crosshair: {
        enabled: true,
      }
    },
    data: [{
      type: "area",
      lineThickness: 1,
      markerType: points.length > 1 ? 'none' : 'circle',
      xValueFormatString: 'HH:mm:ss.ff',
      yValueFormatString: `${ currency }#,##0.00`,
      dataPoints: points.map(
        ({ point, date, changes={} }) => ({
          x: new Date(date),
          y: point.hasOwnProperty(property) ?
            parseFloat(point[property]) :
            0
        })
      )
    }],
  },
  tableOptions: {
    rows: [
      [
        'Change (%)',
        'Date',
        `Price (${ currency })`,
        `Ask (${ currency })`,
        `Bid (${ currency })`,
        'Volume',
      ]
    ].concat(
      points.filter(
        ({ changes={} }) => !!changes[property]
      ).slice(-tableLimit).reverse().map(
        ({ point, date, changes={} }) => ([
          formatTableChange(changes[property][1]),
          formatTableDate(date),
          point.last_price,
          point.ask,
          point.bid,
          point.volume,
        ])
      )
    ),
  }
})
