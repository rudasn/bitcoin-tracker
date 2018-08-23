import date from './date'

it('should return a test date', () => {
  expect(date().toISOString()).toBe(new Date('2018-01-01T00:00:00Z').toISOString())
})
