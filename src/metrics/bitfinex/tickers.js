
export default ({ ticker, points=[], currency, property }) => ({
  chartOptions: {
    theme: 'light2',
    axisY: {
      includeZero: false,
      interval: 5,
      prefix: currency,
    },
    axisX: {
      interval: 30,
    },
    data: [{
      type: "line",
      xValueFormatString: 'HH:mm:ss.ff',
      yValueFormatString: `${ currency }#,##0.00`,
      dataPoints: points.map(
        ({ point, date }) => ({
          x: new Date(date),
          y: parseFloat(point[property]),
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
        ({ changes }) => !!changes[property]
      ).slice(-15).reverse().map(
        ({ point, date, changes }) => ([
          changes[property][1].toFixed(4),
          date.toISOString().split('T')[1],
          point.last_price,
          point.ask,
          point.bid,
          point.volume,
        ])
      )
    ),
  }
})
