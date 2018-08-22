import store from './redux-store'

it('should create redux store', () => {
  expect(store).toHaveProperty('getState')
})
