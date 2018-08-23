import config from './index'

it('should provide required config options', () => {
  // api
  expect(config.api).toBeDefined()
  expect(config.api.host).toBeTruthy()

  // env
  expect(config.env).toBeDefined()
  expect(config.env.NAME).toBeDefined()
  expect(config.env.NODE_ENV).toBe('test')
  expect(config.env.PUBLIC_URL).toBeDefined()
  expect(config.env.TITLE).toBeDefined()
  expect(config.env.VERSION).toBeDefined()

  // store
  expect(config.store).toBeDefined()
  expect(config.store).toHaveProperty('getState')
})
