import { mockDate } from 'testUtils'

import getTickerOptions, { formatTableChange, formatTableDate } from './tickers'

it('should return a configuration object', () => {
  const options = getTickerOptions({
    currency: '$',
    property: 'last_price',
    points: [],
  })
  expect(options).toHaveProperty('chartOptions')
  expect(options).toHaveProperty('tableOptions')
})

it('should return chart points', () => {
  const options = getTickerOptions({
    currency: '$',
    property: 'last_price',
    points: [
      { date: mockDate(), point: { last_price: '1234.567' }, changes: {} },
    ],
  })
  const { dataPoints, yValueFormatString } = options.chartOptions.data[0]

  expect(dataPoints).toEqual([
    {
      indexLabel: undefined,
      indexLabelBackgroundColor: "white",
      indexLabelFontColor: "red",
      x: mockDate(),
      y: 1234.567,
    },
  ])
})


it('should return table points with most recent changes', () => {
  const options = getTickerOptions({
    tableLimit: 2,
    currency: '$',
    property: 'last_price',
    points: [
      { date: mockDate(), point: { last_price: '1234.567', ask: '1234.567', bid: '1234.567', volume: '12.34567',  }, changes: {} },
      { date: mockDate(), point: { last_price: '1234.567', ask: '1234.567', bid: '1234.567', volume: '12.34567',  }, changes: {} },
      { date: mockDate(), point: { last_price: '2345.6789', ask: '2345.6789', bid: '2345.6789', volume: '23.456789',  }, changes: { last_price: [ 1, 2 ] } },
      { date: mockDate(), point: { last_price: '2345.6789', ask: '2345.6789', bid: '2345.6789', volume: '23.456789',  }, changes: {}} ,
      { date: mockDate(), point: { last_price: '3456.789', ask: '3456.789', bid: '3456.789', volume: '34.56789',  }, changes: { last_price: [ 1, 2 ] } },
      { date: mockDate(), point: { last_price: '4567.89', ask: '4567.89', bid: '4567.89', volume: '34.56789',  }, changes: { last_price: [ 2, 3 ] } },
      { date: mockDate(), point: { last_price: '56789.01', ask: '56789.01', bid: '56789.01', volume: '34.56789',  }, changes: { last_price: [ 3, 4 ] } },
    ],
  })
  const { dataPoints, yValueFormatString } = options.chartOptions.data[0]
  const { rows } = options.tableOptions

  expect(rows).toEqual([
    [ 'Change (%)', 'Date', `Price ($)`, `Ask ($)`, `Bid ($)`, 'Volume', ],
    [ formatTableChange(4), formatTableDate(mockDate()), '56789.01', '56789.01', '56789.01', '34.56789' ],
    [ formatTableChange(3), formatTableDate(mockDate()), '4567.89', '4567.89', '4567.89', '34.56789' ],
  ])
})
