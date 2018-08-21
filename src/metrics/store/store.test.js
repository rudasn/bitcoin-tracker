
import metricsStore from './store'

it('creates a metrics store', () => {
  expect(typeof metricsStore).toBe('function')
})

it('provides a reducer for bitfinex', () => {
  const store = metricsStore(undefined, {})
  expect(store.hasOwnProperty('bitfinex')).toBe(true)
})
